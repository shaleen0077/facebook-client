import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NewsFeedService } from '../../service/newsfeed.service';
import { NewsModel } from '../../model/news-feed.model';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss']
})
export class EditNewsComponent implements OnInit {
  @Input() public user;
  @Input() public newsFeed;
  @Output() public closeEditModal: EventEmitter<boolean>  = new EventEmitter(false);
  public editNewsText: string;

  constructor(
    private newsFeedService: NewsFeedService) {}

  
  public onCloseEditModal(): void {
    this.closeEditModal.emit(true);
  }

  public ngOnInit(): void {
    this.editNewsText = this.newsFeed.data.text;
  }

  public onEditNews(): void {
    const post = new NewsModel();
    post.text = this.editNewsText;
    post.type = this.newsFeed.data.type;
    post.imgSrc = this.newsFeed.data.imgSrc;
    this.newsFeedService.patchNews$(this.newsFeed.id, post).subscribe(() => {
      this.editNewsText = null;
      this.closeEditModal.emit(true);
    });
  }
}
