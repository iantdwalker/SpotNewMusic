import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../shared/services/spotify.service';
import { IArtist } from '../shared/model/Artist/artist';

@Component ({
    selector: 'app-artist-search',
    templateUrl: './artist-search.component.html',
    styleUrls: ['./artist-search.component.css']
})
export class ArtistSearchComponent implements OnInit {
    artistSearchString: string = '';
    errorMessage: string;
    selectedArtist: IArtist;

    constructor(private _spotifyService: SpotifyService) {
    }

    ngOnInit(): void {
        // init code can go here
    }

    onSearchArtistsEnterKeyPress(searchQuery: string): void {
        this.artistSearchString = searchQuery;
        this._spotifyService.getArtists(this.artistSearchString).subscribe(
            searchedArtists => {
                if (searchedArtists.artists.items.length >= 1) {
                    this.selectedArtist = searchedArtists.artists.items[0];
                }
            },
            error => {
                this.errorMessage = <any>error;
                console.log('onSearchArtistsEnterKeyPress ERROR: ' + this.errorMessage);
            }
        );
    }
}
