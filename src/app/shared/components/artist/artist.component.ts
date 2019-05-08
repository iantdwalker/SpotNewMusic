import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../../shared/services/spotify.service';
import { IArtist } from '../../../shared/model/Artist/artist';

@Component ({
    selector: 'app-artist',
    templateUrl: './artist.component.html',
    styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
    artist: IArtist;
    
    constructor(private _spotifyService: SpotifyService) {
    }

    ngOnInit(): void {
        // init code can go here
    }    
}
