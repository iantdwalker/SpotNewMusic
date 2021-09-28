import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IArtist } from '@app/shared/model/artist/artist';

@Component ({
    selector: 'app-artist',
    templateUrl: '@app/artist.component.html',
    styleUrls: ['@app/artist.component.css']
})
export class ArtistComponent {
    @Input() artist: IArtist;
    @Input() showLargeArtistImage: boolean;
    @Output() notifyArtistClicked: EventEmitter<IArtist> = new EventEmitter<IArtist>();
    artistPlaceholderImageUrl = 'assets/images/artistPlaceholder.png';

    onArtistClicked(): void {
        this.notifyArtistClicked.emit(this.artist);
    }
}
