import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SessionComponent } from './session/session.component';
import { ArtistSearchComponent } from './artist-search/artist-search.component';
import { ArtistComponent } from './artist/artist.component';
import { ConvertToSpacesPipe } from './shared/pipes/convert-to-spaces.pipe';
import { LimitItemsPipe } from './shared/pipes/limit-items-pipe';

@NgModule({
  declarations: [
    AppComponent,
    SessionComponent,
    ArtistSearchComponent,
    ArtistComponent,
    ConvertToSpacesPipe,
    LimitItemsPipe
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
