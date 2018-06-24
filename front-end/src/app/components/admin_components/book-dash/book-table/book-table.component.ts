import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';

import { BooksService } from '../../../../services/books.service';
import { BookDelWarnComponent } from './book-del-warn/book-del-warn.component';
import { BookDashComponent } from '../book-dash.component';
import { BookEditComponent } from '../book-edit/book-edit.component';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.css']
})
export class BookTableComponent implements OnInit {
  bookdata: any

  displayedColumns = ['_id', 'title', 'author', 'available', 'action'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(private bookService: BooksService,
              private dialog?: MatDialog) {
              console.log('Inside constructor table');
              
  }

  ngOnInit() {
    return this.bookService.getBooks().subscribe((dataBooks: Book[]) => {
      this.dataSource.data = dataBooks;
    });
  }

  ngAfterViewInit() {    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }  

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editBook(bookID, titleVal, authorVal, availVal){
    
    console.log('Editing Book: ',bookID);  

    // code here to edit book
    const dialogRef = this.dialog.open(BookEditComponent,{
      height: '400px',
      width: '600px',
      data: {editId:bookID, 
             bookTitle:titleVal , 
             bookAuthor:authorVal , 
             bookAvailability:availVal 
            }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The edit-dialog was closed'); 
      this.refreshAPIData();
    });

  }

  refreshAPIData(){
    //Dynamic Data check bro this was the only way
    return this.bookService.getBooks().subscribe((dataBooks: Book[]) => {
      this.dataSource.data = dataBooks;
    });
  }

  deleteBook(bookID){
    
    console.log('Deleting Book ID: ', bookID);

    // code here to delete book

    const dialogRef = this.dialog.open(BookDelWarnComponent, {      
      data: {deleteID: bookID}
    })
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The delete-dialog was closed'); 
      this.refreshAPIData();
    });
    
  }
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  available: boolean;
  _v: number
}


