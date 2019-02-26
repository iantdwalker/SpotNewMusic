import { Component, OnInit } from '@angular/core';
import { ISpotifyAccessToken } from '../shared/model/spotifyAccessToken';
import { SpotifyService } from '../shared/services/spotify.service';

@Component ({
    selector: 'app-session',
    templateUrl: './session.component.html',
    styleUrls: ['./session.component.sass']
})
export class SessionComponent implements OnInit {    
    accessTokenNotGrantedMessage: string = 'No current access token';
    accessTokenGrantedMessage: string = 'Access token granted for one hour';
    accessTokenGranted: boolean = false;
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
                this.accessTokenGranted = true;
                console.log('Spotify Access Token: ' + this.spotifyAccessToken.access_token);
                console.log('Expires In: ' + this.spotifyAccessToken.expires_in);
                console.log('Scope: ' + this.spotifyAccessToken.scope);
                console.log('Token Type: ' + this.spotifyAccessToken.token_type);
            },
            error => {
                this.errorMessage = <any>error;
                console.log('getClientCredentialsAccessToken ERROR: ' + this.errorMessage);
            }
        );
    }
}
