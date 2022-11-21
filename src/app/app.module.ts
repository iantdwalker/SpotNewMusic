import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { SessionComponent } from '@session/session.component';
import { ArtistSearchComponent } from '@artist-search/artist-search.component';
import { ArtistComponent } from '@artist/artist.component';
import { ReplaceValuePipe } from '@pipes/replace-value-pipe';
import { LimitItemsPipe } from '@pipes/limit-items-pipe';
import { HeadingComponent } from '@heading/heading.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArtistSearchResultsComponent } from '@artist-search-results/artist-search-results.component';

@NgModule({
  declarations: [
    AppComponent,
    SessionComponent,
    ArtistSearchComponent,
    ArtistComponent,
    ReplaceValuePipe,
    LimitItemsPipe,
    HeadingComponent,
    ArtistSearchResultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
