import { Component, OnInit } from '@angular/core';
import { ISpotifyAccessToken } from '../shared/model/spotifyAccessToken';
import { SpotifyService } from '../shared/services/spotify.service';

@Component ({
    selector: 'app-artist-search',
    templateUrl: './artist-search.component.html',
    styleUrls: ['./artist-search.component.css']
})
export class ArtistSearchComponent {
    
    constructor(private _spotifyService: SpotifyService) {
    }

    ngOnInit(): void {
        // init code can go here
    }

    doSearch(): void {
        console.log('In doSearch() method..')
    }
}
