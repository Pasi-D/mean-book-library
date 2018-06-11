import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ValidateService } from '../../../services/validate.service';
import { AuthService } from '../../../services/auth.service';

import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService,
              private flashMessage: FlashMessagesService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }
    console.log(user);
    
    //Required fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill in all the fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //Validate Email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please Use a Valid Email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //Register User
    this.authService.registerUser(user).subscribe(data => {           
      if ( data.split(',')[0].split(':')[1] === 'true') {
        this.flashMessage.show('You have been registered as a user', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      }else{
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
  }

}
