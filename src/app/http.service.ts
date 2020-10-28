import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  private PAGE_ENDPOINT = 'https://en.wikipedia.org/w/api.php?action=query&meta=siteinfo&siprop=statistics&format=json&origin=*';

  public getArticleCount(){
    var page_count: string
    this.httpClient.get(this.PAGE_ENDPOINT).subscribe(data =>{
      page_count = data['query']['statistics']['articles'].toString()
    })
    return page_count;
  }

  public fetchArticles(){
    return this.httpClient.get(this.PAGE_ENDPOINT)
  }
  
  


}