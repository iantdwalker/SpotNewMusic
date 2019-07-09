import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SessionComponent } from './session/session.component';
import { ArtistSearchComponent } from './artist-search/artist-search.component';
import { RelatedArtistsComponent } from './related-artists/related-artists.component';
import { ArtistComponent } from './shared/components/artist/artist.component';
import { ConvertToSpacesPipe } from './shared/pipes/convert-to-spaces.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SessionComponent,
    ArtistSearchComponent,
    RelatedArtistsComponent,
    ArtistComponent,
    ConvertToSpacesPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
