import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { SpotifyService } from '@services/spotify-service';
import { IArtist } from '@models/artist/artist';
import { Subscription, Observable, EMPTY, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, catchError, switchMap } from 'rxjs/operators';
import { UntypedFormControl } from '@angular/forms';

@Component ({
    selector: 'app-artist-search',
    templateUrl: './artist-search.component.html',
    styleUrls: ['./artist-search.component.scss']
})
export class ArtistSearchComponent implements OnInit, OnDestroy {
    @Input() spotifyAccessTokenGranted = false;
    artistSearchValue: string;
    errorMessage: string;
    selectedArtist: IArtist;
    artistSearchResults$: Observable<IArtist[]>;
    artistSearchResultsSubject = new Subject<string>();
    relatedArtistsSubject = new Subject<string>();
    getArtistManualSubscription: Subscription;
    artistSearchbarInputFormControl: UntypedFormControl = new UntypedFormControl();
    artistPlaceholderImageUrl = 'assets/images/artistPlaceholder.png';
    genresUnknown = 'genre(s) unknown';

    constructor(private _spotifyService: SpotifyService) {
    }

    ngOnInit(): void {
        this.initialiseArtistSearch();
        this.artistSearchbarInputFormControl.valueChanges.pipe(
            debounceTime(200),
            distinctUntilChanged()
        )
        .subscribe(
            artistSearchbarInputValue => this.artistSearchResultsSubject.next(artistSearchbarInputValue)
        );
    }

    initialiseArtistSearch(): void {
        this.artistSearchResults$ = this.artistSearchResultsSubject.pipe(
            switchMap(artistSearchTerm => this._spotifyService.getArtists(artistSearchTerm).pipe(
                catchError(error => this.onArtistSearchError(error))
            )
        ));
    }

    ngOnDestroy(): void {
        this.getArtistManualSubscription.unsubscribe();
    }

    onArtistSearchQueryPerformed(searchQuery: string): void {
       this.getArtistManualSubscription = this._spotifyService.getArtists(searchQuery)
       .subscribe(
           searchedArtists => {
               this.selectArtist(searchedArtists[0]);
               this.initialiseArtistSearch();
            },
           error => this.onArtistSearchError(error)
        );
    }

    onArtistSearchResultSelected(artist: IArtist): void {
        this.selectArtist(artist);
        this.initialiseArtistSearch();
     }

    onRelatedArtistClickedEvent(artist: IArtist): void {
        this.selectArtist(artist);
        this.initialiseArtistSearch();
    }

    selectArtist(artist: IArtist): void {
        if (artist != null) {
            this.artistSearchValue = artist.name;
            this.selectedArtist = artist;
            this.relatedArtistsSubject.next(artist.id);
        }
    }

    onArtistSearchError(error: any): Observable<never> {
        this.errorMessage = <any>error;
        console.log('Artist Search ERROR: ' + this.errorMessage);
        return EMPTY;
    }
}
