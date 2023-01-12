import { Component, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ArtistSearchResultsComponent } from '@components/artist-search-results/artist-search-results.component';
import { SpotifyService } from '@services/spotify-service';
import { IArtist } from '@models/artist/artist';
import { Subscription, Observable, EMPTY, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, catchError, switchMap } from 'rxjs/operators';
import { UntypedFormControl } from '@angular/forms';
import { faSearch, faClose } from '@fortawesome/free-solid-svg-icons';

@Component ({
    selector: 'app-artist-search',
    templateUrl: './artist-search.component.html',
    styleUrls: ['./artist-search.component.scss']
})
export class ArtistSearchComponent implements AfterViewInit, OnDestroy {
    artistSearchValue: string;
    selectedArtist: IArtist;
    artistSearchResults$: Observable<IArtist[]>;
    artistSearchResultsSubject = new Subject<string>();
    relatedArtistsSubject = new Subject<string>();
    getArtistManualSubscription: Subscription;
    artistSearchbarInputFormControl: UntypedFormControl = new UntypedFormControl();
    artistPlaceholderImageUrl = 'assets/images/artistPlaceholder.png';
    genresUnknown = 'genre(s) unknown';
    faSearch = faSearch;
    faClose = faClose;
    @ViewChild("artistSearchbarInput") inputElementRef: ElementRef;
    @ViewChild("artistSearchResults") artistSearchResults: ArtistSearchResultsComponent;

    constructor(private _spotifyService: SpotifyService) {
    }

    ngAfterViewInit(): void {
        this._spotifyService.spotifyAccessTokenGrantedChanged.subscribe(value => {
            if (!value) {
                this.artistSearchbarInputFormControl.disable();
            }
            else {
                this.artistSearchbarInputFormControl.enable();
                this.initialiseArtistSearch();
                this.artistSearchbarInputFormControl.valueChanges.pipe(
                    debounceTime(200),
                    distinctUntilChanged()
                )
                .subscribe(
                    artistSearchbarInputValue => {
                        if (artistSearchbarInputValue) {
                            this.artistSearchResultsSubject.next(artistSearchbarInputValue)
                        }
                        else {
                            this.initialiseArtistSearch();
                            this.selectedArtist = null;
                            this.artistSearchResults.initialiseRelatedArtistSearch();
                        }
                    }
                );
            }
        });
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
        this.scrollToTopOfPage();
     }

    onRelatedArtistClickedEvent(artist: IArtist): void {
        this.selectArtist(artist);
        this.initialiseArtistSearch();
        this.scrollToTopOfPage();
    }

    selectArtist(artist: IArtist): void {
        if (artist != null) {
            this.artistSearchValue = artist.name;
            this.selectedArtist = artist;
            this.relatedArtistsSubject.next(artist.id);
        }
    }

    onArtistSearchError(error: string): Observable<never> {
        console.log('Artist Search ERROR: ' + error);
        return EMPTY;
    }

    onClearArtistSearchbarInput() : void {
        this.artistSearchbarInputFormControl.setValue("");
        this.initialiseArtistSearch();
        if (this.inputElementRef.nativeElement) {
            this.inputElementRef.nativeElement.focus();
        }
    }

    scrollToTopOfPage(): void {
        window.scrollTo(0,0);
    }
}
