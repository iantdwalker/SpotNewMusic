import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ISpotifyAccessToken } from '@models/authentication/spotify-access-token';
import { SpotifyService } from '@services/spotify-service';
import { Subscription } from 'rxjs';

@Component ({
    selector: 'app-session',
    templateUrl: './session.component.html',
    styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit, OnDestroy {
    accessTokenNotGrantedMessage = 'Spotify api access not authorized - search disabled';
    spotifyAccessToken: ISpotifyAccessToken;
    errorMessage: string;
    accessTokenTimeLeft: number;
    interval: any;
    getClientCredentialsAccessTokenSubscription: Subscription;

    constructor(private _spotifyService: SpotifyService) {
    }

    ngOnInit(): void {
        this.getClientCredentialsAccessToken();
    }

    ngOnDestroy(): void {
        this.getClientCredentialsAccessTokenSubscription.unsubscribe();
    }

    getClientCredentialsAccessToken(): void {
        this.getClientCredentialsAccessTokenSubscription = this._spotifyService.getClientCredentialsAccessToken()
            .subscribe(spotifyAccessToken => this.setSpotifyAccessToken(spotifyAccessToken),
            error => this.onGetClientCredentialsAccessTokenError(error));
    }

    setSpotifyAccessToken(spotifyAccessToken: ISpotifyAccessToken): void {
        this.spotifyAccessToken = spotifyAccessToken;
        this._spotifyService.spotifyAccessTokenGranted = true;
        this.accessTokenTimeLeft = parseInt(this.spotifyAccessToken.expires_in, 10);
        this.startAccessTokenExpiryTimer();
    }

    startAccessTokenExpiryTimer(): void {
        this.interval = setInterval(() => {
            if (this.accessTokenTimeLeft > 0) {
                this.accessTokenTimeLeft--;
            } else {
                this.stopAccessTokenExpiryTimer();
                this.spotifyAccessToken = null;
                this.getClientCredentialsAccessToken();
            }
        }, 1000);
      }

      stopAccessTokenExpiryTimer(): void {
        clearInterval(this.interval);
      }

      onGetClientCredentialsAccessTokenError(error: any): void {
        this._spotifyService.spotifyAccessTokenGranted = false;
        this.errorMessage = <any>error;
        console.log('getClientCredentialsAccessToken ERROR: ' + this.errorMessage);
      }

      get spotifyAccessTokenGranted(): boolean {
        return this._spotifyService.spotifyAccessTokenGranted;
      }
}
