import {Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private httpClient: HttpService) {}

  article_title: string = '';
  article_extract;
  article_url: string = '';
  article_complete: boolean = false;

  extractArticle() {
    console.log('click');
    const article$ = this.httpClient.fetchArticle();
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
