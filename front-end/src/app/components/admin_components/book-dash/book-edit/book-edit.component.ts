import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BooksService } from '../../../../services/books.service';

import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  public _editBookForm: FormGroup;
  
  constructor(private dialogRef: MatDialogRef<any>,
    private _formBuilder: FormBuilder,
    private _bookService: BooksService,
    private flashMessage: FlashMessagesService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {      
    this._editBookForm = this._formBuilder.group({
      _id: [],
      Title: [this.data.bookTitle , [Validators.required]],
      Author: [this.data.bookAuthor, [Validators.required]],
      Available: [this.data.bookAvailability.toString(), [Validators.required]]
    });
  }

  onSubmitEdit() {
    const editedBook = {
      title: this._editBookForm.value.Title,
      author: this._editBookForm.value.Author,
      available: (this._editBookForm.value.Available === 'true')
    }

    //Edit Book
    this._bookService.editBook(this.data.editId, editedBook).subscribe(data=>{
      console.log('On Edit Data received: ', data);
      if (data.success) {
        this.dialogRef.close();
        this.flashMessage.show('Book Updated Successfully', {cssClass: 'alert-success', timeout: 3000});        
      }else{
        this.dialogRef.close();
        this.flashMessage.show('Book failed to Update', {cssClass: 'alert-danger', timeout: 3000});       
      }      
    })
    
    
  }

}
