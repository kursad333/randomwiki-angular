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

  // Boolean value which we can use to make sure the content is ready for display. Used for error handling
  article_complete: boolean;
  error_msg: string;


  extractArticle(){
    // Using the http service to get the response of the API call
    const article$ = this.httpClient.fetchArticle()

    // Using the subscribe function to open up the response observable
    article$.subscribe(data =>{
      // If both the status is OK and the returned body  is not empty we will extract data from it
      if (data.status==200 && data.body!==undefined){
        this.article_title = data.body['query']['pages'][0]['title'];
        this.article_extract = data.body['query']['pages'][0]['extract'];
        this.article_url = data.body['query']['pages'][0]['fullurl']; 
        this.article_complete = true;
      }
      else{
        this.article_complete = false;
      }
    },
    err => {
      this.article_complete = false;
      this.error_msg = err
    })
  }

  ngOnInit(): void {
  }
}
