import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ISpotifyAccessToken } from 'src/app/shared/model/spotifyAccessToken';

@Injectable({
    providedIn: 'root'
})
export class SpotifyService {
    authenticateUrl: string = 'https://accounts.spotify.com/api/token';    
    
    constructor(private _httpClient: HttpClient) {
    }
    
    authenticate(clientId: string, clientSecret: string): Observable<ISpotifyAccessToken> {
        // http call to spotify authentication here:
        // 10a206bb484844deae5a67a5c6871428 -- my client ID
        // 962f4ea59dc342b6aed3a9d21ba15d34 -- my client secret
        
        // 1. base 64 encode the client id and secret with format: 'clientID:secret'
        let encodedClientValue = btoa(clientId + ':' + clientSecret);

        // 2. create a POST request
        // Sample Request:
        // Method: POST
        // Endpoint: 	https://accounts.spotify.com/api/token
        // Headers: 'Authorization' - 'Basic base64_String_Value'
        // Body Params:	'grant_type' - 'client_credentials'        
        const headers = new HttpHeaders()
        .set('Content-Encoding', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Basic ' + encodedClientValue);
        
        /* {
            'Authorization': 'Basic ' + encodedClientValue            
        }); */
        //'Content-Type': 'application/x-www-form-urlencoded',
        //'Access-Control-Allow-Origin': '*'              
        //headers.set('Content-Type', 'application/json; charset=utf-8');
        //headers.set('Authorization', 'Basic ' + encodedClientValue);
        const httpParams = new HttpParams()
        .set('grant_type', 'client_credentials');

        let body = {};
        
        return this._httpClient.post<ISpotifyAccessToken>(this.authenticateUrl, body, {headers: headers, params: httpParams}).pipe(
            tap(data => console.log('Tapped Data: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );       

        // dummy token until http call is complete:
        /* const accessToken: ISpotifyAccessToken = {
            accessToken : 'dfdfd',
            tokenType : 'dfdfd',
            expiresIn : 'dfdfd',
            scope : 'dfdfd'
        }; */

        //return accessToken;
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'IAN ERROR ' + error.message;
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}
