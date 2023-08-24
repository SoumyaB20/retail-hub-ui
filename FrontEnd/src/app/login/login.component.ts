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

  protected flag = false;
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
        this.flag = true;
        setTimeout(() => {
          this.flag = false;
        }, 3000);
        console.error('HTTP error:', error);
      }
    );
  }
}
