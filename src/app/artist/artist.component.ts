import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Artist } from '../shared/model/artist/artist';

@Component ({
    selector: 'app-artist',
    templateUrl: './artist.component.html',
    styleUrls: ['./artist.component.css']
})
export class ArtistComponent {
    @Input() artist: Artist;
    @Input() showLargeArtistImage: boolean;
    @Output() notifyArtistClicked: EventEmitter<Artist> = new EventEmitter<Artist>();
    artistPlaceholderImageUrl = 'assets/images/artistPlaceholder.png';

    onArtistClicked(): void {
        this.notifyArtistClicked.emit(this.artist);
    }
}
