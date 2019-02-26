import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ISpotifyAccessToken } from 'src/app/shared/model/spotifyAccessToken';

@Injectable({
    providedIn: 'root'
})
export class SpotifyService {
    _clientCredentialsAccessTokenUrl: string = 'http://localhost:8888/clientCredentialsAccessToken';

    constructor(private _httpClient: HttpClient) {
    }

    getClientCredentialsAccessToken(): Observable<ISpotifyAccessToken> {
        // Create a GET request to the SpotNewMusic-Server Node.js server
        return this._httpClient.get<ISpotifyAccessToken>(this._clientCredentialsAccessTokenUrl).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        const errorMessage = 'SpotifyService ERROR: ' + error.message;
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}
