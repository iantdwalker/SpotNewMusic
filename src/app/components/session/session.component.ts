import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ISpotifyAccessToken } from '@models/authentication/spotify-access-token';
import { SpotifyService } from '@services/spotify-service';
import { Subscription } from 'rxjs';

@Component ({
    selector: 'app-session',
    templateUrl: './session.component.html',
    styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit, OnDestroy {
    accessTokenNotGrantedMessage = 'Spotify access token has expired or could not be granted';
    accessTokenGrantedMessage = 'Spotify access token granted and will expire in: ';
    spotifyAccessToken: ISpotifyAccessToken;
    errorMessage: string;
    accessTokenTimeLeft: number;
    interval: any;
    getClientCredentialsAccessTokenSubscription: Subscription;
    @Output() notifySpotifyAccessTokenGranted: EventEmitter<boolean> = new EventEmitter<boolean>();

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
        this.notifySpotifyAccessTokenGranted.emit(true);
        this.spotifyAccessToken = spotifyAccessToken;
        this.accessTokenTimeLeft = parseInt(this.spotifyAccessToken.expires_in, 10);
        this.startAccessTokenExpiryTimer();
    }

    startAccessTokenExpiryTimer(): void {
        this.interval = setInterval(() => {
            if (this.accessTokenTimeLeft > 0) {
                this.accessTokenTimeLeft--;
            } else {
                this.stopAccessTokenExpiryTimer();
                this.getClientCredentialsAccessToken();
            }
        }, 1000);
      }

      stopAccessTokenExpiryTimer(): void {
        clearInterval(this.interval);
      }

      onGetClientCredentialsAccessTokenError(error: any): void {
        this.notifySpotifyAccessTokenGranted.emit(false);
        this.errorMessage = <any>error;
        console.log('getClientCredentialsAccessToken ERROR: ' + this.errorMessage);
      }
}
