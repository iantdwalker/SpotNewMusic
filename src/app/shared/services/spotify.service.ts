import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ISpotifyAccessToken } from 'src/app/shared/model/Authentication/spotifyAccessToken';
import { ISearchedArtists } from '../model/Artist/searchedArtists';
import { isNullOrUndefined } from 'util';

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
        // https://codecraft.tv/courses/angular/http/http-with-observables/

        return this.http.get<ISpotifyAccessToken>(this._clientCredentialsAccessTokenUrl).pipe(
            map(response => {
                this._spotifyAccessToken = response;
                return response;
            }),
            catchError(this.handleError));
    }

    getArtists(artistSearchTerm: string): Observable<ISearchedArtists> {
        artistSearchTerm = artistSearchTerm.trim();

        const httpParams = new HttpParams()
            .set('q', artistSearchTerm)
            .set('type', 'artist')
            .set('limit', '1');

        const httpHeaders = new HttpHeaders()
            .set('Authorization', 'Bearer ' + this._spotifyAccessToken.access_token);

        const httpOptions = {
            headers: httpHeaders,
            params: httpParams
        };

        return this.http.get<ISearchedArtists>(this._spotifySearchUrl, httpOptions).pipe(
            map(response => {
                return response;
            }),
            catchError(this.handleError));
    }

    hasValidAccessToken(): boolean {
        return !isNullOrUndefined(this._spotifyAccessToken);
    }

    private handleError(error: HttpErrorResponse) {
        const errorMessage = 'SpotifyService ERROR: ' + error.message;
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}
