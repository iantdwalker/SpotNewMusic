import { Component, OnInit } from '@angular/core';
import { ISpotifyAccessToken } from '../shared/model/spotifyAccessToken';
import { SpotifyService } from '../shared/services/spotify.service';

@Component ({
    selector: 'app-session',
    templateUrl: './session.component.html',
    styleUrls: ['./session.component.sass']
})
export class SessionComponent implements OnInit {
    clientId: string;
    clientSecret: string;
    accessTokenNotGrantedMessage = 'No current access token';
    accessTokenGrantedMessage = 'Access token granted';
    accessTokenGranted = false;
    spotifyAccessToken: ISpotifyAccessToken;
    accessToken: string;
    errorMessage: string;

    constructor(private _spotifyService: SpotifyService) {
    }

    ngOnInit(): void {
        // init code can go here
    }

    getAccessToken(): void {
        this._spotifyService.authenticate(this.clientId, this.clientSecret).subscribe(
            spotifyAccessToken => {
                this.spotifyAccessToken = spotifyAccessToken;
                this.accessToken = this.spotifyAccessToken.accessToken;
                this.accessTokenGranted = true;

                console.log('Spotify Access Token: ' + this.spotifyAccessToken.accessToken);
                console.log('Expires In: ' + this.spotifyAccessToken.expiresIn);
                console.log('Scope: ' + this.spotifyAccessToken.scope);
                console.log('Token Type: ' + this.spotifyAccessToken.tokenType);
            },
            error => {
                this.errorMessage = <any>error;
                console.log('getAccessToken ERROR: ' + this.errorMessage);
            }
        );
    }
}
