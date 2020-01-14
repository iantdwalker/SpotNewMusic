import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ISpotifyAccessToken } from 'src/app/shared/model/Authentication/spotifyAccessToken';
import { ISearchedArtists } from '../model/Artist/searchedArtists';
import { IRelatedArtists } from '../model/Artist/relatedArtists';

@Injectable({
    providedIn: 'root'
})
export class SpotifyService {
    _clientCredentialsAccessTokenUrl = 'http://localhost:8888/clientCredentialsAccessToken';
    _spotifyAccessToken: ISpotifyAccessToken;
    _spotifySearchUrl = 'https://api.spotify.com/v1/search';
    _spotifyRelatedArtistsUrl = 'https://api.spotify.com/v1/artists/{id}/related-artists';

    constructor(private http: HttpClient) {
    }

    getClientCredentialsAccessToken(): Observable<ISpotifyAccessToken> {
        return this.http.get<ISpotifyAccessToken>(this._clientCredentialsAccessTokenUrl)
        .pipe(
            tap(response => this._spotifyAccessToken = response),
            catchError(error => this.handleError(error))
        );
    }

    getArtists(artistSearchTerm: string): Observable<ISearchedArtists> {
        artistSearchTerm = artistSearchTerm.trim();
        const httpParams = new HttpParams()
            .set('q', artistSearchTerm)
            .set('type', 'artist')
            .set('limit', '5');
        const httpHeaders = new HttpHeaders()
            .set('Authorization', 'Bearer ' + this._spotifyAccessToken.access_token);
        const httpOptions = {
            headers: httpHeaders,
            params: httpParams
        };

        return this.http.get<ISearchedArtists>(this._spotifySearchUrl, httpOptions)
        .pipe(
            catchError(error => this.handleError(error))
        );
    }

    getRelatedArtists(artistId: string): Observable<IRelatedArtists> {
        artistId = artistId.trim();
        const getRelatedArtistsUrl = this._spotifyRelatedArtistsUrl.replace('{id}', artistId);
        const httpHeaders = new HttpHeaders()
            .set('Authorization', 'Bearer ' + this._spotifyAccessToken.access_token);
        const httpOptions = {
            headers: httpHeaders
        };

        return this.http.get<IRelatedArtists>(getRelatedArtistsUrl, httpOptions)
        .pipe(
            catchError(error => this.handleError(error))
        );
    }

    private handleError(error: HttpErrorResponse) {
        const errorMessage = 'SpotifyService ERROR: ' + error.message;
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}
