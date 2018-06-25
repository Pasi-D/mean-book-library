import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BooksService } from '../../../../services/books.service';
import { Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.css']
})
export class BookDialogComponent implements OnInit {

  public _bookForm: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<any>,
              private _bookService: BooksService,
              private flashMessage: FlashMessagesService,              
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void{
    this.dialogRef.close();
  }

  ngOnInit() {
    this._bookForm = this._formBuilder.group({
      _id: [],
      Title: ['', [Validators.required]],
      Author: ['', [Validators.required]],
      Available: ['', [Validators.required]]      
    })
  }

  onSubmit(){
    const book = {
      title: this._bookForm.value.Title,
      author: this._bookForm.value.Author,
      available: (this._bookForm.value.Available === 'true')
    }
    
    //Register a book
    this._bookService.registerBook(book).subscribe(data=>{
      console.log('data received: ',data);
      if (data.success) {
        this.dialogRef.close();
        this.flashMessage.show('Book Registered Successfully', {cssClass: 'alert-success', timeout: 3000});        
      }else{
        this.dialogRef.close();
        this.flashMessage.show('Book failed to register', {cssClass: 'alert-danger', timeout: 3000});       
      }
    })       
  }

}
