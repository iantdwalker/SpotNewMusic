import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { SpotifyService } from '../shared/services/spotify.service';
import { IArtist } from '../shared/model/artist/artist';

@Component ({
    selector: 'app-artist',
    templateUrl: './artist.component.html',
    styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit, OnChanges {
    @Input() artist: IArtist;
    @Input() showLargeArtistImage: boolean;
    @Output() notifyArtistClicked: EventEmitter<string> = new EventEmitter<string>();

    constructor(private _spotifyService: SpotifyService) {
    }

    ngOnInit(): void {
    }

    ngOnChanges(): void {
        // container change code can go here
    }

    onArtistClicked() {
        this.notifyArtistClicked.emit(this.artist.name);
    }
}
