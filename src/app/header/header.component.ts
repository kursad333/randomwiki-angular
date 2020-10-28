import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private httpClient: HttpService) { }

  // Initialize the variable used in the component html
  article_count: string = '0';

  // Function to extract the JSON data from the observable. The desired data is in a nested json object.
  public getCount(): void {
    this.httpClient.fetchStatistics().subscribe(data => {
      this.article_count = data['query']['statistics']['articles'].toString();
    });
  }

  ngOnInit(): void {
    // Since this is the header we need to update it whenever the site gets refreshed.
    this.getCount();
  }
}
