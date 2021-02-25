import { Component, OnInit } from '@angular/core';
import { ImgurService } from '../service/imgur.service';
import { NewsFeedModel, NewsModel } from '../model/news-feed.model';
import { NewsFeedService } from '../service/newsfeed.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public feeds: NewsFeedModel[] =  [];
  public showPostModal: boolean = false;
  public showEditModal: boolean = false;
  public currentNews: NewsFeedModel;
  private currentImageLink = '';
  public user = {
    imgSrc: '../assets/user.png',
    lastName: 'Wick',
    firstName: 'John'
  }

  constructor(
    private imgService: ImgurService,
    private newsFeed: NewsFeedService) {}

  public ngOnInit(): void {
   this.refreshFeed();
  }

  public refreshFeed(): void {
    this.showEditModal = false;
    this.newsFeed.getNewsFeed$().subscribe((feeds) => {
      this.feeds = feeds;
    });
  }

  public onDelete(id: number): void {
    this.newsFeed.deleteNewsFeed$(id).subscribe((success) => {
      this.feeds = this.feeds.filter((x) => x.id !== id);
    });
  }

  public postNews(post: string): void {
    this.newsFeed.postNews$(post, this.currentImageLink).subscribe(() => {
      this.showPostModal = false;
      this.refreshFeed();
    });
  }

  public onCloseModal(): void {
    this.showPostModal = false;
  }

  public onShowPostNewsModal(): void {
    this.currentImageLink = null;
    this.showPostModal = true;
  }
  
  public imageInputChange(imageInput: any) {
    this.imgService.upload(imageInput).subscribe((res: any) => {
      this.currentImageLink = res.data.link;
    });
  }

  public onEdit(id: number): void {
    this.showEditModal = true;
    const feed = this.feeds.find((x) => x.id === id);
    this.currentNews = new NewsFeedModel();
    this.currentNews = feed;
    
  }

  public onCloseEditModal(): void {
    this.currentNews = null;
    this.showEditModal = false;
    this.refreshFeed();
  }

}
