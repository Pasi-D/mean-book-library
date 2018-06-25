import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class BooksService {
  
  constructor(private  httpClient:  HttpClient,
              private http: Http) { }

  API_URL = "http://localhost:3000/api/books";

  getBooks(){
    return this.httpClient.get(this.API_URL);
  }

  getBookById(bookId){
    return this.http.get('http://localhost:3000/api/books/' + bookId)
      .pipe(map((res)=>res.json()));
  }

  registerBook(book){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.API_URL, book, { headers: headers })
      .pipe(map((res) => res.json()));
  }

  editBook(bookId, book){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/api/books/' + bookId, book, { headers: headers })
      .pipe(map((res)=>res.json()));
  }

  deleteBook(bookId){
    return this.http.delete('http://localhost:3000/api/books/' + bookId)
    .pipe(map((res) => res.json()));
  }

}
export interface Book{
  _id: string;
  title: string;
  author: string;
  available: boolean;
  _v: number
}
