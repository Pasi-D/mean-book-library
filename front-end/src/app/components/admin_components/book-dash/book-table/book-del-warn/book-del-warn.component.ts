import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder } from '@angular/forms';
import { BooksService } from '../../../../../services/books.service';

import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-book-del-warn',
  templateUrl: './book-del-warn.component.html',
  styleUrls: ['./book-del-warn.component.css']
})
export class BookDelWarnComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<any>,              
              private _bookService: BooksService,
              private flashMessage: FlashMessagesService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void{
    this.dialogRef.close();
  }

  ngOnInit() {
    
  }

  confirmDelete(){
    //Code here to delete after warn

    console.log('This will be removed: ', this.data.deleteID);

    this._bookService.deleteBook(this.data.deleteID).subscribe(Rdata => {
      console.log('delete status ', Rdata);
      if (Rdata.success) {
        this.dialogRef.close();
        this.flashMessage.show('Book Deleted Successfully', {cssClass: 'alert-success', timeout: 3000});
      } else {
        this.dialogRef.close();
        this.flashMessage.show('Book failed to register', {cssClass: 'alert-danger', timeout: 3000});     
      }
    })
    
  }

}
