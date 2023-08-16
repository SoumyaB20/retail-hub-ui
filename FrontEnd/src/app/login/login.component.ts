import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { User } from '../data-type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  user:User= new User();

  constructor(private authService: AuthServiceService, private router:Router) {}

  
  OnSubmit(){
    // console.log(this.user);
    this.authService.loginUser(this.user)
  .subscribe(
    (response: string) => {
      
        console.log(response);
        if(response==="User Exists")
        alert("login sucessfully");
        this.router.navigate(['/product'])
    },
    (error: HttpErrorResponse) => {
      alert("Invalid username or password");
      console.error('HTTP error:', error);
    }
  );
  }
}

