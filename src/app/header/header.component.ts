import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private httpClient: HttpService) { }

  article_count: string;

  ngOnInit(): void {

    this.httpClient.fetchStatistics().subscribe(data => {
      this.article_count = data['query']['statistics']['articles'].toString()
    }) 
  }
}
