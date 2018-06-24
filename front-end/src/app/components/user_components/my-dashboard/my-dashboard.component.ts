import { Component } from '@angular/core';

@Component({
  selector: 'my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent {
  innerWidth: number

  constructor() {
  }
  cards = [
    { title: 'Category 1', cols: 1, rows: 2 },
    { title: 'Category 2', cols: 1, rows: 2 },
    { title: 'Category 3', cols: 1, rows: 2 },
    { title: 'Category 4', cols: 1, rows: 2 }
  ];

  isMobileDashboard() {
    if (innerWidth > 960 || (innerWidth > 600 && innerWidth < 639)) {
      return false;
    }
    return true;
  }

}
