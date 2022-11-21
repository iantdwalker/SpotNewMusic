import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { SpotifyService } from '@services/spotify-service';
import { IArtist } from '@app/shared/models/artist/artist';
import { Observable, EMPTY, Subject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-artist-search-results',
  templateUrl: './artist-search-results.component.html',
  styleUrls: ['./artist-search-results.component.scss']
})
export class ArtistSearchResultsComponent implements OnInit {
  @Input() selectedArtist: IArtist;
  @Input() relatedArtistsSubject: Subject<string>;
  @Output() notifyRelatedArtistClicked: EventEmitter<IArtist> = new EventEmitter<IArtist>();
  relatedArtists$: Observable<IArtist[]>;
  noRelatedArtistsMessage = 'No related artists found.';
  errorMessage: string;

  constructor(private _spotifyService: SpotifyService) {
  }

  ngOnInit(): void {
    this.initialiseRelatedArtistSearch();
  }

  initialiseRelatedArtistSearch(): void {
    this.relatedArtists$ = this.relatedArtistsSubject.pipe(
        switchMap(artistId => this._spotifyService.getRelatedArtists(artistId).pipe(
            catchError(error => this.onRelatedArtistSearchError(error))
        )
    ));
  }

  onRelatedArtistClickedEvent(artist: IArtist): void {
    this.notifyRelatedArtistClicked.emit(artist);
  }

  onRelatedArtistSearchError(error: any): Observable<never> {
    this.errorMessage = <any>error;
    console.log('Related Artist Search ERROR: ' + this.errorMessage);
    return EMPTY;
  }
}
