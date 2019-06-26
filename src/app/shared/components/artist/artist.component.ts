import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { SpotifyService } from '../../../shared/services/spotify.service';
import { IArtist } from '../../../shared/model/Artist/artist';

@Component ({
    selector: 'app-artist',
    templateUrl: './artist.component.html',
    styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit, OnChanges {
    @Input() artist: IArtist;
    @Input() showLargeArtistImage: boolean;
    
    constructor(private _spotifyService: SpotifyService) {
    }

    ngOnInit(): void {
        // init code can go here
    }
    
    ngOnChanges(): void {
        // container change code can go here - such as when the artists-search comp sets a new selectedArtist
        //console.log('ngOnChanges fired from ArtistComponent');
    }
}
