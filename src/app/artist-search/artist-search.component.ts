import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../shared/services/spotify.service';
import { IArtist } from '../shared/model/Artist/artist';
import { IRelatedArtists } from '../shared/model/Artist/relatedArtists';
import { ISearchedArtists } from '../shared/model/Artist/searchedArtists';

@Component ({
    selector: 'app-artist-search',
    templateUrl: './artist-search.component.html',
    styleUrls: ['./artist-search.component.css']
})
export class ArtistSearchComponent implements OnInit {
    artistSearchString = '';
    errorMessage: string;
    selectedArtist: IArtist;
    canSearch = false;
    relatedArtists: IArtist[];

    constructor(private _spotifyService: SpotifyService) {
    }

    ngOnInit(): void {
    }

    onSearchArtistsEnterKeyPress(searchQuery: string): void {
       this.performArtistSearch(searchQuery);
    }

    onNotifyArtistClicked(artistName: string): void {
        this.performArtistSearch(artistName);
    }

    performArtistSearch(artistSearchTerm: string): void {
        this.artistSearchString = artistSearchTerm;
        this._spotifyService.getArtists(this.artistSearchString)
            .subscribe(searchedArtists => this.setArtists(searchedArtists),
            error => this.performArtistSearchError(error));
    }

    setArtists(searchedArtists: ISearchedArtists): void {
        if (searchedArtists.artists.items.length >= 1) {
            this.selectedArtist = searchedArtists.artists.items[0];
            this.getRelatedArtists();
        }
    }

    getRelatedArtists(): void {
        this._spotifyService.getRelatedArtists(this.selectedArtist.id)
            .subscribe(relatedArtists => this.setRelatedArtists(relatedArtists),
            error => this.performArtistSearchError(error));
    }

    setRelatedArtists(relatedArtists: IRelatedArtists): void {
        if (relatedArtists.artists.length >= 1) {
            this.relatedArtists = relatedArtists.artists;
        }
    }

    performArtistSearchError(error: any): void {
        this.errorMessage = <any>error;
        console.log('performArtistSearch ERROR: ' + this.errorMessage);
    }
}
