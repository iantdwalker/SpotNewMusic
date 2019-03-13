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
    
    constructor(private _spotifyService: SpotifyService) {
    }

    ngOnInit(): void {
        // init code can go here
    }

    onSearchArtistEnterKeyPress(value: string): void {
        this.artistSearchString = value;
        console.log('In onSearchArtistEnterKeyPress() method..search string: ' + this.artistSearchString);
        this._spotifyService.getArtist(this.artistSearchString);
    }
}
