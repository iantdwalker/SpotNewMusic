import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { SpotifyService } from '../shared/services/spotify.service';
import { IArtist } from '../shared/model/Artist/artist';
import { ISearchedArtists } from '../shared/model/Artist/searchedArtists';
import { Subscription, Observable, EMPTY } from 'rxjs';
import { debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component ({
    selector: 'app-artist-search',
    templateUrl: './artist-search.component.html',
    styleUrls: ['./artist-search.component.css']
})
export class ArtistSearchComponent implements OnInit, OnDestroy {
    @Input() spotifyAccessTokenGranted = false;
    artistSearchString = '';
    errorMessage: string;
    selectedArtist: IArtist;
    canSearch = false;
    relatedArtists$: Observable<IArtist[]>;
    getArtistSubscription: Subscription;
    artistSearchResults: any[] = [];
    searchbarInput: FormControl = new FormControl();
    noArtistResultsMessage = 'No results found.';
    noRelatedArtistsMessage = 'No related artists found.';
    artistPlaceholderImageUrl = 'assets/images/artistPlaceholder.png';
    genresUnknown = 'genre(s) unknown';

    constructor(private _spotifyService: SpotifyService) {
    }

    ngOnInit(): void {
        this.searchbarInput.valueChanges
        .pipe(
            debounceTime(200),
            distinctUntilChanged()
        )
        .subscribe(searchbarInputValue => this.getArtists(searchbarInputValue)
        .subscribe(
            response => this.artistSearchResults = response.artists.items,
            error => this.onArtistSearchError(error)
        ));
    }

    ngOnDestroy(): void {
        this.getArtistSubscription.unsubscribe();
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
        .subscribe(
            searchedArtists => this.setArtists(searchedArtists),
            error => this.onArtistSearchError(error)
        );
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
        this.relatedArtists$ = this._spotifyService.getRelatedArtists(this.selectedArtist.id)
        .pipe(
            catchError(error => this.onRelatedArtistSearchError(error))
        );
    }

    onArtistSearchError(error: any): Observable<never> {
        this.errorMessage = <any>error;
        console.log('Artist Search ERROR: ' + this.errorMessage);
        return EMPTY;
    }

    onRelatedArtistSearchError(error: any): Observable<never> {
        this.errorMessage = <any>error;
        console.log('Related Artist Search ERROR: ' + this.errorMessage);
        return EMPTY;
    }
}
