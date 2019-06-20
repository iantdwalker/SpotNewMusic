import { Component, Input } from '@angular/core';
import { SpotifyService } from '../shared/services/spotify.service';

@Component ({
    selector: 'app-related-artists',
    templateUrl: './related-artists.component.html',
    styleUrls: ['./related-artists.component.css']
})
export class RelatedArtistsComponent {
    // 19I4tYiChJoxEO5EuviXpz --artist ID for AFI
    @Input() artistId: string;

    constructor(private _spotifyService: SpotifyService) {
    }

    ngOnInit(): void {
        // init code can go here
    }
    
    ngOnChanges(): void {
        // container change code can go here - such as when the artists-search comp sets a new selectedArtist
        console.log('ngOnChanges fired in RelatedArtistsComponent');
    }
}
