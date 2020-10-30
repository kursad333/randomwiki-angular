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

  
  extractArticle(){
    // Using the http service to get the response of the API call
    const article$ = this.httpClient.fetchArticle()
    // Initializing variables to use as validation points for better readability
    var status;
    var query;
    // Using the subscribe function to open up the response observable
    article$.subscribe(res =>{
      // Storing points to validate in the variables. We use this method to make sure the api call is executed properly
      query = res.body['query']['pages'][0]
      status = res.status
      // If both the status is OK and the JSON object is not empty we will extract data from it
      if (status==200 && query!==undefined){
        this.article_title = res.body['query']['pages'][0]['title'];
        this.article_extract = res.body['query']['pages'][0]['extract'];
        this.article_url = res.body['query']['pages'][0]['fullurl'];
        this.article_complete = true;
      }
      else{
        this.article_complete = false;
      }
    })
  }


  ngOnInit(): void {
  }
}
