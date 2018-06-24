import { Component } from '@angular/core';

@Component({
  selector: 'user-dash',
  templateUrl: './user-dash.component.html',
  styleUrls: ['./user-dash.component.css']
})
export class UserDashComponent {
  innerWidth: number

  cards = [
    { title: 'Card 1', cols: 2, rows: 1 },
    { title: 'Card 2', cols: 1, rows: 1 },
    { title: 'Card 3', cols: 1, rows: 2 },
    { title: 'Card 4', cols: 1, rows: 1 }
  ];

  isMobileDashboard() {
    if (innerWidth > 960 || (innerWidth > 600 && innerWidth < 639)) {
      return false;
    }
    return true;
  }
}
