import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SessionComponent } from './components/session/session.component';
import { ArtistSearchComponent } from './components/artist-search/artist-search.component';
import { ArtistComponent } from './components/artist/artist.component';
import { ReplaceValuePipe } from './shared/pipes/replace-value-pipe';
import { LimitItemsPipe } from './shared/pipes/limit-items-pipe';
import { HeadingComponent } from './components/heading/heading.component';

@NgModule({
  declarations: [
    AppComponent,
    SessionComponent,
    ArtistSearchComponent,
    ArtistComponent,
    ReplaceValuePipe,
    LimitItemsPipe,
    HeadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [HeadingComponent]
})
export class AppModule { }
