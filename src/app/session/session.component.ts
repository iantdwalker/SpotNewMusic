import { Component, OnInit } from '@angular/core';
import { ISpotifyAccessToken } from '../shared/model/Authentication/spotifyAccessToken';
import { SpotifyService } from '../shared/services/spotify.service';

@Component ({
    selector: 'app-session',
    templateUrl: './session.component.html',
    styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
    accessTokenNotGrantedMessage = 'Spotify access token has expired or could not be granted';
    accessTokenGrantedMessage = 'Spotify access token granted and will expire in: ';
    spotifyAccessToken: ISpotifyAccessToken;
    errorMessage: string;
    accessTokenTimeLeft: number;
    interval: any;

    constructor(private _spotifyService: SpotifyService) {
    }

    ngOnInit(): void {
        this.getClientCredentialsAccessToken();
    }

    getClientCredentialsAccessToken(): void {
        this._spotifyService.getClientCredentialsAccessToken().subscribe(
            spotifyAccessToken => {
                this.spotifyAccessToken = spotifyAccessToken;
                this.accessTokenTimeLeft = parseInt(this.spotifyAccessToken.expires_in, 10);
                this.startAccessTokenExpiryTimer();
            },
            error => {
                this.errorMessage = <any>error;
                console.log('getClientCredentialsAccessToken ERROR: ' + this.errorMessage);
            }
        );
    }

    startAccessTokenExpiryTimer() {
        this.interval = setInterval(() => {
            if (this.accessTokenTimeLeft > 0) {
                this.accessTokenTimeLeft--;
            } else {
                this.stopAccessTokenExpiryTimer();
                this.getClientCredentialsAccessToken();
            }
        }, 1000);
      }

      stopAccessTokenExpiryTimer() {
        clearInterval(this.interval);
      }
}
