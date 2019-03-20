import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ISpotifyAccessToken } from 'src/app/shared/model/Authentication/spotifyAccessToken';
import { IArtist } from '../model/Artist/artist';

@Injectable({
    providedIn: 'root'
})
export class SpotifyService {
    _clientCredentialsAccessTokenUrl: string = 'http://localhost:8888/clientCredentialsAccessToken';
    _spotifySearchUrl: string = 'https://api.spotify.com/v1/search';
    _spotifyAccessToken: ISpotifyAccessToken;

    constructor(private http: HttpClient) {
    }

    getClientCredentialsAccessToken(): Observable<ISpotifyAccessToken> {
        // Create a GET request to the SpotNewMusic-Server Node.js server
        /* return this.http.get<ISpotifyAccessToken>(this._clientCredentialsAccessTokenUrl).pipe(
            catchError(this.handleError)
        ); */       

        //https://codecraft.tv/courses/angular/http/http-with-observables/       

        return this.http.get<ISpotifyAccessToken>(this._clientCredentialsAccessTokenUrl).pipe(
            map(res => {
                this._spotifyAccessToken = res;
                return res;
            }),
            catchError(this.handleError));            
    }
    
    getArtists(artistSearchTerm: string) {
        artistSearchTerm = artistSearchTerm.trim();

        const httpParams = new HttpParams()
            .set('q', artistSearchTerm)
            .set('type', 'artist')
            .set('limit', '1');
        
        const httpOptions = {
            headers: new HttpHeaders({
              'Authorization': 'Bearer ' + this._spotifyAccessToken.access_token
            }),
            params: httpParams
          };

        return this.http.get<IArtist[]>(this._spotifySearchUrl, httpOptions).pipe(
            map(res => {
                console.log('getArtist artists found: ' + JSON.stringify(res));
                return res;
            }),
            catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        const errorMessage = 'SpotifyService ERROR: ' + error.message;
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}
