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
    accessToken: string;

    constructor(private _spotifyService: SpotifyService) {
    }

    ngOnInit(): void {
        console.log('Session component initialised');
    }

    getAccessToken(): void {
        const spotifyAccessToken = this._spotifyService.authenticate(this.clientId, this.clientSecret);
        this.accessToken = spotifyAccessToken.accessToken;
        this.accessTokenGranted = !this.accessTokenGranted;

        console.log('Spotify Access Token: ' + spotifyAccessToken.accessToken);
        console.log('Expires In: ' + spotifyAccessToken.expiresIn);
        console.log('Scope: ' + spotifyAccessToken.scope);
        console.log('Token Type: ' + spotifyAccessToken.tokenType);
    }
}
