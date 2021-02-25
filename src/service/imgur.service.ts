import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ImgurService {
  private readonly IMGUR_UPLOAD_URL = 'https://api.imgur.com/3/image';
  private readonly clientId = '';

  /**
   * Creates a new instance of NewsFeedService
   * @constructor
   * @param {HttpUemClient} httpClient - Instance HTTP Client
   */
  constructor(
    private http: HttpClient
  ) {
  }

  public upload(image: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Client-ID ${this.clientId}`
      }),
    };
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(`${this.IMGUR_UPLOAD_URL}`, formData, httpOptions);
  }

}