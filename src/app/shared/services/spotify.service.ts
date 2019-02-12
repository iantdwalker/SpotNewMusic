import { Injectable } from '@angular/core';
import { ISpotifyAccessToken } from 'src/app/shared/model/spotifyAccessToken';

@Injectable({
    providedIn: 'root'
})
export class SpotifyService {
    authenticate(clientId: string, clientSecret: string): ISpotifyAccessToken {
        console.log('SpotifyService.authenticate called with params: ' + clientId + ', ' + clientSecret);

        // http call to spotify authentication here:

        // 10a206bb484844deae5a67a5c6871428 -- my client ID
        // 962f4ea59dc342b6aed3a9d21ba15d34 -- my client secret
        // base64 encode the above two strings in the following format: clientID:clientSecret
        // string to send to the spotify api call is 'Basic base64_String_Value'

        // Sample Request:
        // Method: POST
        // Endpoint: 	https://accounts.spotify.com/api/token
        // Headers: 'Authorization' - 'Basic MTBhMjA2YmI0ODQ4NDRkZWFlNWE2N2E1YzY4NzE0Mjg6OTYyZjRlYTU5ZGMzNDJiNmFlZDNhOWQyMWJhMTVkMzQ='
        // Body Params:	'grant_type' - 'client_credentials'

        // dummy token until http call is complete:
        const accessToken: ISpotifyAccessToken = {
            accessToken : 'dfdfd',
            tokenType : 'dfdfd',
            expiresIn : 'dfdfd',
            scope : 'dfdfd'
        };

        return accessToken;
    }
}
