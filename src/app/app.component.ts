import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Spot New Music';
  spotifyAccessTokenGranted = false;

  onNotifySpotifyAccessTokenGranted(tokenGranted: boolean): void {
    this.spotifyAccessTokenGranted = tokenGranted;
  }
}
