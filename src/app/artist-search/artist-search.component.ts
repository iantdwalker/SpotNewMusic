import { Component, OnInit } from '@angular/core';
import { ISpotifyAccessToken } from '../shared/model/Authentication/spotifyAccessToken';
import { SpotifyService } from '../shared/services/spotify.service';

@Component ({
    selector: 'app-artist-search',
    templateUrl: './artist-search.component.html',
    styleUrls: ['./artist-search.component.css']
})
export class ArtistSearchComponent {
    artistSearchString: string = '';
    errorMessage: string;
    
    constructor(private _spotifyService: SpotifyService) {
    }

    ngOnInit(): void {
        // init code can go here
    }

    onSearchArtistsEnterKeyPress(value: string): void {
        this.artistSearchString = value;
        console.log('In onSearchArtistsEnterKeyPress() method..search string: ' + this.artistSearchString);
        this._spotifyService.getArtists(this.artistSearchString).subscribe(
            artists => {
                console.log('ARTISTS COUNT: ' + artists.length);
            },
            error => {
                this.errorMessage = <any>error;
                console.log('onSearchArtistsEnterKeyPress ERROR: ' + this.errorMessage);
            }
        );
    }
}
