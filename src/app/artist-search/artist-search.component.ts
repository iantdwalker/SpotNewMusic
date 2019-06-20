import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../shared/services/spotify.service';
import { IArtist } from '../shared/model/Artist/artist';
import { IRelatedArtists } from '../shared/model/Artist/relatedArtists';

@Component ({
    selector: 'app-artist-search',
    templateUrl: './artist-search.component.html',
    styleUrls: ['./artist-search.component.css']
})
export class ArtistSearchComponent implements OnInit {
    artistSearchString: string = '';
    errorMessage: string;
    selectedArtist: IArtist;
    canSearch: boolean = false;
    //relatedArtists: IArtist[];

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

        //Sample call to the service to get the related artists for AFI
        /* this._spotifyService.getRelatedArtists('19I4tYiChJoxEO5EuviXpz').subscribe(
            relatedArtists => {
                if (relatedArtists.artists.length >= 1) {
                    this.relatedArtists = relatedArtists.artists;
                    console.log('AFI Related artists: ' + JSON.stringify(this.relatedArtists));
                }
            },
            error => {
                this.errorMessage = <any>error;
                console.log('onSearchArtistsEnterKeyPress ERROR: ' + this.errorMessage);
            }
        ); */
    }
}
