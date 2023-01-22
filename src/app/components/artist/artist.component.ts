import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ArtistSettingsService } from "@app/shared/services/artist-settings.service";
import { IArtist } from "@models/artist/artist";

@Component({
  selector: "app-artist",
  templateUrl: "./artist.component.html",
  styleUrls: ["./artist.component.scss"],
})
export class ArtistComponent {
  @Input() artist: IArtist;
  @Input() showLargeArtistImage: boolean;
  @Output() notifyArtistClicked: EventEmitter<IArtist> =
    new EventEmitter<IArtist>();
  artistPlaceholderImageUrl = "assets/images/artistPlaceholder.png";

  constructor(private artistSettingsService: ArtistSettingsService) {}

  showArtistDetails(): boolean {
    return this.artistSettingsService.showArtistDetails;
  }

  onArtistClicked(): void {
    this.notifyArtistClicked.emit(this.artist);
  }
}
