import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private httpClient: HttpService) { }

  // Initialize all variables which we need to use in the component html
  article_title: string = '';
  article_extract: string = ''
  article_url: string = '';
  // Boolean value which we can use to make sure the function is executed. Used to only display the page-content div if it's executed
  article_complete: boolean = false;


  // Function used to extract the api response observable.
  extractArticle() {
    // Making use of the service function to receive the observable
    const article$ = this.httpClient.fetchArticle();

    // This is where we extract all data from the received observable
    article$.subscribe(data => {
      this.article_title = data['query']['pages'][0]['title'];
      this.article_extract = data['query']['pages'][0]['extract'];
      this.article_url = data['query']['pages'][0]['fullurl'];
      this.article_complete = true;
    });
  }

  ngOnInit(): void {
  }
}
