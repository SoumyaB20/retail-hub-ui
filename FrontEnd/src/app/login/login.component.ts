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
  user:User= new User();

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}
  @ViewChild('loginForm') loginForm!: NgForm;

  OnSubmit() {
    this.authService.loginUser(this.user).subscribe(
      (response) => {
        this.authService.setLogin(response.userId);
        this.router.navigate(['/product']);
      },
      (error: HttpErrorResponse) => {
        alert('Invalid username or password');
        console.error('HTTP error:', error);
      }
    );
  }
}
