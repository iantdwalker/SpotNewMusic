import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
//import { map } from 'rxjs/operators';

//import 'rxjs/add/operator/map';
import { catchError, tap, map } from 'rxjs/operators';
import { ISpotifyAccessToken } from 'src/app/shared/model/Authentication/spotifyAccessToken';

@Injectable({
    providedIn: 'root'
})
export class SpotifyService {
    _clientCredentialsAccessTokenUrl: string = 'http://localhost:8888/clientCredentialsAccessToken';
    _spotifyAccessToken: ISpotifyAccessToken;

    constructor(private _httpClient: HttpClient) {
    }

    getClientCredentialsAccessToken(): Observable<ISpotifyAccessToken> {
        // Create a GET request to the SpotNewMusic-Server Node.js server
        /* return this._httpClient.get<ISpotifyAccessToken>(this._clientCredentialsAccessTokenUrl).pipe(
            catchError(this.handleError)
        ); */       

        //https://codecraft.tv/courses/angular/http/http-with-observables/

        return this._httpClient.get<ISpotifyAccessToken>(this._clientCredentialsAccessTokenUrl).pipe(
            map(res => {
                console.log('IAN: ' + res.access_token);
                this._spotifyAccessToken = res;
                return res;
            }),
            catchError(this.handleError));
    }
    
    getArtist(artist: string) {
        console.log('getArtist search term: ' + artist);
        console.log('getArtist token value: ' + this._spotifyAccessToken.access_token);
    }

    private handleError(error: HttpErrorResponse) {
        const errorMessage = 'SpotifyService ERROR: ' + error.message;
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}
