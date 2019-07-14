import { Component, OnInit } from '@angular/core';
import { ISpotifyAccessToken } from '../shared/model/Authentication/spotifyAccessToken';
import { SpotifyService } from '../shared/services/spotify.service';

@Component ({
    selector: 'app-session',
    templateUrl: './session.component.html',
    styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
    accessTokenNotGrantedMessage = 'No access token';
    accessTokenGrantedMessage = 'Access token granted for one hour';
    spotifyAccessToken: ISpotifyAccessToken;
    errorMessage: string;

    constructor(private _spotifyService: SpotifyService) {
    }

    ngOnInit(): void {
        // init code can go here
    }

    getClientCredentialsAccessToken(): void {
        this._spotifyService.getClientCredentialsAccessToken().subscribe(
            spotifyAccessToken => {
                this.spotifyAccessToken = spotifyAccessToken;
                // console.log('Spotify Access Token: ' + this.spotifyAccessToken.access_token);
                // console.log('Expires In: ' + this.spotifyAccessToken.expires_in);
                // console.log('Scope: ' + this.spotifyAccessToken.scope);
                // console.log('Token Type: ' + this.spotifyAccessToken.token_type);
            },
            error => {
                this.errorMessage = <any>error;
                console.log('getClientCredentialsAccessToken ERROR: ' + this.errorMessage);
            }
        );
    }
}
