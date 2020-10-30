import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  // API endpoint to request wikipedia statistics, used to get the article count
  private statistics_endpoint = 'https://en.wikipedia.org/w/api.php?action=query&meta=siteinfo&siprop=statistics&format=json&origin=*';
  // API endpoint to request a random wikipedia article.
  private article_endpoint = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=extracts|info&exintro&inprop=url&origin=*&formatversion=2&exintro';


  // Function to request the statistics. This returns an observable with json inside
  public fetchStatistics() {
    return this.httpClient.get(this.statistics_endpoint).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // Function to request the random article. This returns an observable with json inside
  public fetchArticle() {
    return this.httpClient.get(this.article_endpoint, { observe: 'response' })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      
      // Return an observable with a user-facing error message.
      return throwError(
        `<h5>Something went wrong, please try again later.</h5><h6>Status code: ${error.status}</h6>`);
    }
  }
}