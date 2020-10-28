import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }


  private statistics_endpoint = 'https://en.wikipedia.org/w/api.php?action=query&meta=siteinfo&siprop=statistics&format=json&origin=*';
  public fetchStatistics(){
    return this.httpClient.get(this.statistics_endpoint)
  }


  private article_endpoint = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=extracts|info&exintro&inprop=url&origin=*&formatversion=2&exintro'
  public fetchArticle(){
    return this.httpClient.get(this.article_endpoint)
  }

  public jsontest(){
    this.fetchArticle().subscribe(data => {
      console.log(data)
    })
  }

}