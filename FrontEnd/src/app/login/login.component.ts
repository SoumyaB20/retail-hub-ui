import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { User } from '../data-type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // user:User= new User();
  user = {
    username: '',
    password: '',
  };
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}
  @ViewChild('loginForm') loginForm!: NgForm;

  OnSubmit() {
    // console.log(this.user);
    this.authService.loginUser(this.user).subscribe(
      (response: string) => {
        console.log(response);
        if (response === 'User Exists') this.authService.setLogin(1);
        alert('login sucessfully');
        this.router.navigate(['/product']);
      },
      (error: HttpErrorResponse) => {
        alert('Invalid username or password');
        console.error('HTTP error:', error);
      }
    );
  }
}
