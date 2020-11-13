import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private httpClient: HttpService) { }

  // Initializing variables used to display all info regarding the articles and statistics
  article_count: string = '0';
  article_title: string;
  article_extract: string
  article_url: string

  // Initializing variables used for error handling
  query_succesful: boolean = undefined;
  error_msg: string = '<h5>Something went wrong, please try again later.</h5>'

  // Function to extract the nested JSON data from the http response observable. Also checks for faulty responses and handles them accordingly.
  // This function is responsible for displaying the wikipedia article count everytime the site gets reloaded.
  private getCount(): void {
    const stats$ = this.httpClient.fetchStatistics()
    stats$.subscribe(
      data => {
        try {
          this.article_count = data.body['query']['statistics']['articles'].toString()
        }
        catch {
          this.query_succesful = false
          this.error_msg = `<h5>Something went wrong, please try again later.</h5><h6>Status code: empty_statistics</h6>`
        }
      },
      err => {
        this.query_succesful = false;
        this.error_msg = err
      }
    )
  }

  // Function to extract the nested JSON data from the http response observable. Also checks for faulty responses and handles them accordingly.
  // This function is responsible for displaying the random articles everytime the user clicks on start.
  public extractArticle(): void {
    const article$ = this.httpClient.fetchArticle()
    article$.subscribe(
      data => {
        try {
          this.article_title = data.body['query']['pages'][0]['title'];
          this.article_extract = data.body['query']['pages'][0]['extract'];
          this.article_url = data.body['query']['pages'][0]['fullurl'];
          this.query_succesful = true;
        }
        catch {
          this.query_succesful = false
          this.error_msg = `<h5>Something went wrong, please try again later.</h5><h6>Status code: faulty_article</h6>`
        }
      },
      err => {
        this.query_succesful = false;
        this.error_msg = err
      }
    )
  }

  ngOnInit(): void {
    this.getCount()
  }
}
