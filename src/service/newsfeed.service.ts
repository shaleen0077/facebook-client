import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsFeedModel, NewsModel } from '../model/news-feed.model';
import { map } from 'rxjs/operators';

/**
 * NewsFeedService
 */
@Injectable()
export class NewsFeedService {
  private baseUrl: string = 'http://localhost:3000/api';

  /**
   * Creates a new instance of NewsFeedService
   * @constructor
   * @param {HttpUemClient} httpClient - Instance HTTP Client
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * Gets the feeds for the user
   * @returns {Observable<NewsFeedModel[[]]>} List of news feed
   * @memberof NewsFeedService
   */
  public getNewsFeed$(): Observable<NewsFeedModel[]> {
    return this.httpClient.get(`${this.baseUrl}/feeds`).pipe(
        map((list: any) => list.results),
        map((list: any) => {
            return list ? list.map((item) => {
                item.data = JSON.parse(item.data);
                return item as NewsFeedModel;
            }) : [];
        }));
  }

  /**
   * Post the news for the user
   * @param {string} text - Data of the feed
   * @param {string} imageSrc - Image source
   * @returns {Observable<boolean>} True if created successfully
   * @memberof NewsFeedService
   */
  public postNews$(text: string, imageSrc: string): Observable<boolean> {
    const post = new NewsModel();
    if (imageSrc) {
        post.type = 2;
        post.imgSrc = imageSrc;
    }
    post.text = text;
    return this.httpClient.post(`${this.baseUrl}/news`, post, { observe: 'response' }).pipe(
        map((res) => res.status === 200));
  }

  /**
   * Edit the news text for the user
   * @param {number} id - Post id
   * @param {string} txt - Data of the feed
   * @returns {Observable<boolean>} True if editted successfully
   * @memberof NewsFeedService
   */
  public patchNews$(id: number, model: NewsModel): Observable<boolean> {
    return this.httpClient.patch(`${this.baseUrl}/news/${id}`, model, { observe: 'response' }).pipe(
        map((res) => res.status === 200));
  }

  /**
   * Deletes the particular feeds for the user
   * @param {number} id - Id of the feed
   * @returns {Observable<boolean>} True if deleted successfully
   * @memberof NewsFeedService
   */
  public deleteNewsFeed$(id: number): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/feeds/${id}`, { observe: 'response' }).pipe(
        map((res) => res.status === 200));
  }
}
