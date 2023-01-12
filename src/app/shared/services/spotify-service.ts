import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ISpotifyAccessToken } from '@models/authentication/spotify-access-token';
import { ISearchedArtists } from '@models/artist/searched-artists';
import { IRelatedArtists } from '@models/artist/related-artists';
import { IArtist } from '@models/artist/artist';
@Injectable({
    providedIn: 'root'
})
export class SpotifyService {
    //Spot New Music Node Serverless API (Azure Function app embedded):
    _clientCredentialsAccessTokenUrl = '/api/spotify-access-token';
    _spotifyAccessToken: ISpotifyAccessToken;
    _spotifySearchUrl = 'https://api.spotify.com/v1/search';
    _spotifyRelatedArtistsUrl = 'https://api.spotify.com/v1/artists/{id}/related-artists';
    // default to true to avoid colour flash on render:
    _spotifyAccessTokenGranted = true;
    spotifyAccessTokenGrantedChanged: Subject<boolean> = new Subject<boolean>();

    constructor(private http: HttpClient) {
    }

    get spotifyAccessTokenGranted() : boolean {
        return this._spotifyAccessTokenGranted;
    }
    
    set spotifyAccessTokenGranted(value: boolean) {
        this._spotifyAccessTokenGranted = value;
        this.spotifyAccessTokenGrantedChanged.next(this.spotifyAccessTokenGranted);
    }

    getClientCredentialsAccessToken(): Observable<ISpotifyAccessToken> {
        return this.http.get<ISpotifyAccessToken>(this._clientCredentialsAccessTokenUrl)
        .pipe(
            tap(response => this._spotifyAccessToken = response),
            catchError(error => this.handleError(error))
        );
    }

    getArtists(artistSearchTerm: string): Observable<IArtist[]> {
        artistSearchTerm = artistSearchTerm.trim();
        const httpParams = new HttpParams()
            .set('q', artistSearchTerm)
            .set('type', 'artist')
            .set('limit', '10');
        const httpHeaders = new HttpHeaders()
            .set('Authorization', 'Bearer ' + this._spotifyAccessToken.access_token);
        const httpOptions = {
            headers: httpHeaders,
            params: httpParams
        };

        return this.http.get<ISearchedArtists>(this._spotifySearchUrl, httpOptions)
        .pipe(
            map(searchedArtists => searchedArtists.artists.items),
            catchError(error => this.handleError(error))
        );
    }

    getRelatedArtists(artistId: string): Observable<IArtist[]> {
        artistId = artistId.trim();
        const getRelatedArtistsUrl = this._spotifyRelatedArtistsUrl.replace('{id}', artistId);
        const httpHeaders = new HttpHeaders()
            .set('Authorization', 'Bearer ' + this._spotifyAccessToken.access_token);
        const httpOptions = {
            headers: httpHeaders
        };

        return this.http.get<IRelatedArtists>(getRelatedArtistsUrl, httpOptions)
        .pipe(
            map(relatedArtists => relatedArtists.artists),
            catchError(error => this.handleError(error))
        );
    }

    private handleError(error: HttpErrorResponse) {
        const errorMessage = 'SpotifyService ERROR: ' + error.message;
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
    }
}
