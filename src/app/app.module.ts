import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsFeedService } from '../service/newsfeed.service';
import { ImgurService } from '../service/imgur.service';
import { FormsModule } from '@angular/forms';
import { EditNewsComponent } from './edit-news/edit-news.component';

@NgModule({
  declarations: [
    AppComponent,
    EditNewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    NewsFeedService,
    ImgurService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
