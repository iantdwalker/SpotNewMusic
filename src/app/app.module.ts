import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '@app/app.component';
import { SessionComponent } from '@app/session/session.component';
import { ArtistSearchComponent } from '@app/artist-search/artist-search.component';
import { ArtistComponent } from '@app/artist/artist.component';
import { ReplaceValuePipe } from '@app/shared/pipes/replace-value-pipe';
import { LimitItemsPipe } from '@app/shared/pipes/limit-items-pipe';
import { HeadingComponent } from '@app/heading/heading.component';

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
