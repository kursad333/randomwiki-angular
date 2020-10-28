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

  page: string;

  ngOnInit(): void {

    const a = this.httpClient.fetchArticles().subscribe(data => {
      this.page = data['query']['statistics']['articles'].toString()
    }) 
  }
}
