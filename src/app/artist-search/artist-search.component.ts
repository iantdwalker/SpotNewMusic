import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { SpotifyService } from '../shared/services/spotify.service';
import { IArtist } from '../shared/model/Artist/artist';
import { IRelatedArtists } from '../shared/model/Artist/relatedArtists';
import { ISearchedArtists } from '../shared/model/Artist/searchedArtists';
import { Subscription, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component ({
    selector: 'app-artist-search',
    templateUrl: './artist-search.component.html',
    styleUrls: ['./artist-search.component.css']
})
export class ArtistSearchComponent implements OnInit, OnDestroy {
    artistSearchString = '';
    errorMessage: string;
    selectedArtist: IArtist;
    canSearch = false;
    relatedArtists: IArtist[];
    getArtistSubscription: Subscription;
    getRelatedArtistsSubscription: Subscription;
    @Input() spotifyAccessTokenGranted = false;
    artistSearchResults: any[] = [];
    searchbarInput: FormControl = new FormControl();

    constructor(private _spotifyService: SpotifyService) {
    }

    ngOnInit(): void {
        this.searchbarInput.valueChanges
        .subscribe(searchbarInputValue => this.getArtists(searchbarInputValue)
        .subscribe(response => this.artistSearchResults = response.artists.items));
    }

    ngOnDestroy(): void {
        this.getArtistSubscription.unsubscribe();
        this.getRelatedArtistsSubscription.unsubscribe();
    }

    onSearchArtistsEnterKeyPress(searchQuery: string): void {
       this.performArtistSearch(searchQuery);
    }

    onRelatedArtistClickedEvent(relatedArtistName: string): void {
        this.performArtistSearch(relatedArtistName);
    }

    performArtistSearch(artistSearchTerm: string): void {
        this.artistSearchResults = [];
        this.artistSearchString = artistSearchTerm;

        this.getArtistSubscription = this.getArtists(this.artistSearchString)
        .subscribe(searchedArtists => this.setArtists(searchedArtists),
            error => this.onArtistSearchError(error));
    }

    getArtists(artistSearchTerm: string): Observable<ISearchedArtists> {
        if (!artistSearchTerm) {
            this.artistSearchResults = [];
        }
        return this._spotifyService.getArtists(artistSearchTerm);
    }

    setArtists(searchedArtists: ISearchedArtists): void {
        if (searchedArtists.artists.items.length >= 1) {
            this.selectedArtist = searchedArtists.artists.items[0];
            this.getRelatedArtists();
        }
    }

    getRelatedArtists(): void {
        this.getRelatedArtistsSubscription = this._spotifyService.getRelatedArtists(this.selectedArtist.id)
        .subscribe(relatedArtists => this.setRelatedArtists(relatedArtists),
            error => this.onArtistSearchError(error));
    }

    setRelatedArtists(relatedArtists: IRelatedArtists): void {
        if (relatedArtists.artists.length >= 1) {
            this.relatedArtists = relatedArtists.artists;
        }
    }

    onArtistSearchError(error: any): void {
        this.errorMessage = <any>error;
        console.log('Artist search ERROR: ' + this.errorMessage);
    }
}
