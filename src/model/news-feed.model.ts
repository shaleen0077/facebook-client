/**
 * A class model news feed.
 * @class
 */
export class NewsModel {
    /**
     * Type of data,
     * 1 - text only
     * 2 - text + image
     * @example 1
     */
    public type: 1|2 = 1;

    /**
     * Created post text
     */
    public text: string = undefined;

    /**
     * Image src in the news
     */
    public imgSrc: string = undefined;
}

/**
 * A class model news feed.
 * @class
 */
export class NewsFeedModel {
  /**
   * Id number for news
   * @example 1
   */
  public id: number = undefined;

  /**
   * Created post date time
   */
  public timeStamp: string = undefined;

  /**
   * Created post model
   */
  public data: NewsModel = undefined;
}