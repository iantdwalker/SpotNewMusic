import { Component } from '@angular/core';
import { ArtistSettingsService } from '@app/shared/services/artist-settings.service';
import { SpotifyService } from '@app/shared/services/spotify-service';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent {
  constructor(
    private artistSettingsService: ArtistSettingsService,
    private spotifyService: SpotifyService) {
  }

  get showArtistDetails(): boolean {
    return this.artistSettingsService.showArtistDetails;
  }

  set showArtistDetails(value: boolean) {
    this.artistSettingsService.showArtistDetails = value;
  }

  get spotifyAccessTokenGranted(): boolean {
    return this.spotifyService.spotifyAccessTokenGranted;
  }
}
