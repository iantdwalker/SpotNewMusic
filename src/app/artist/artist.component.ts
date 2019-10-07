import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IArtist } from '../shared/model/artist/artist';

@Component ({
    selector: 'app-artist',
    templateUrl: './artist.component.html',
    styleUrls: ['./artist.component.css']
})
export class ArtistComponent {
    @Input() artist: IArtist;
    @Input() showLargeArtistImage: boolean;
    @Output() notifyArtistClicked: EventEmitter<string> = new EventEmitter<string>();

    onArtistClicked(): void {
        this.notifyArtistClicked.emit(this.artist.name);
    }
}
