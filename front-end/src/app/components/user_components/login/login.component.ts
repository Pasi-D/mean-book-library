import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';

import './flash.css';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String
  password: String

  constructor(private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {  
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }      
  }

  loginUser(){      
    const user = {
      username: this.username,
      password: this.password
    }
    console.log('trying to authenticate with api');
    console.log(user);
    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success && data.user.role === "User" ) {
        this.authService.storeUserData(data.token, data.user);
        // This is pretty ugly neeed to fix
        this.flashMessage.show('You have successfully logged in', {cssClass: 'alert-success', timeout: 50000});
        this.router.navigate(['/']);        
      }else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['/login']);
        this.username = null
        this.password = null
      }
    })
  }
}
