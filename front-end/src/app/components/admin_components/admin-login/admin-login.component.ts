import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  username: String
  password: String

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    if (this.authService.isAdminLoggedIn()) {
      this.router.navigate(['/admin-books']);
    }
  }

  loginAdmin(){
    const admin = {
      username: this.username,
      password: this.password
    }
    console.log('trying to authenticate with api');    
    this.authService.authenticateUser(admin).subscribe(data => {
      if (data.success && data.user.role === "Admin") {        
        this.authService.storeAdminData(data.token, data.user);        
        // This is pretty ugly neeed to fix
        this.flashMessage.show('You have successfully logged in', {cssClass: 'alert-success', timeout: 50000});
        this.router.navigate(['/admin-books']);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['/admin/login']);
        this.username = null
        this.password = null
      }
    })   
  }
}
