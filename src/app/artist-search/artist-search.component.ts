import { Component, OnDestroy, Input } from '@angular/core';
import { SpotifyService } from '../shared/services/spotify.service';
import { IArtist } from '../shared/model/Artist/artist';
import { IRelatedArtists } from '../shared/model/Artist/relatedArtists';
import { ISearchedArtists } from '../shared/model/Artist/searchedArtists';
import { Subscription } from 'rxjs';

@Component ({
    selector: 'app-artist-search',
    templateUrl: './artist-search.component.html',
    styleUrls: ['./artist-search.component.css']
})
export class ArtistSearchComponent implements OnDestroy {
    artistSearchString = '';
    errorMessage: string;
    selectedArtist: IArtist;
    canSearch = false;
    relatedArtists: IArtist[];
    getArtistSubscription: Subscription;
    getRelatedArtistsSubscription: Subscription;
    @Input() spotifyAccessTokenGranted = false;
    noArtistFound = 'Nope! no artists have been found matching your search term';

    constructor(private _spotifyService: SpotifyService) {
    }

    ngOnDestroy(): void {
        this.getArtistSubscription.unsubscribe();
        this.getRelatedArtistsSubscription.unsubscribe();
    }

    onSearchArtistsEnterKeyPress(searchQuery: string): void {
       this.performArtistSearch(searchQuery);
    }

    onNotifyArtistClicked(artistName: string): void {
        this.performArtistSearch(artistName);
    }

    performArtistSearch(artistSearchTerm: string): void {
        this.artistSearchString = artistSearchTerm;
        this.getArtistSubscription = this._spotifyService.getArtists(this.artistSearchString)
            .subscribe(searchedArtists => this.setArtists(searchedArtists),
            error => this.onArtistSearchError(error));
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
