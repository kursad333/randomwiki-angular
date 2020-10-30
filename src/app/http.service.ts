import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {}

  // API endpoint to request wikipedia statistics, used to get the article count
  private statistics_endpoint = 'https://en.wikipedia.org/w/api.php?action=query&meta=siteinfo&siprop=statistics&format=json&origin=*';

  // Function to request the statistics. This returns an observable with json inside
  public fetchStatistics() {
    return this.httpClient.get(this.statistics_endpoint);
  }


  // API endpoint to request a random wikipedia article.
  private article_endpoint = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=extracts|info&exintro&inprop=url&origin=*&formatversion=2&exintro';

  // Function to request the random article. This returns an observable with json inside
  public fetchArticle() {
    return this.httpClient.get(this.article_endpoint, {observe: 'response'});
  }

}
