import { Component } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { User } from '../data-type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  user:User= new User();

  constructor(private authService: AuthServiceService) {}

  // onSubmit(): void {
  //   this.authService.login(this.username, this.password).subscribe(
  //     () => {
  //       // Redirect or perform actions on successful login
  //       console.log('Login successful');
  //     },
  //     (error) => {
  //       // Handle login error
  //       console.error('Login failed:', error);
  //     }
  //   );
  // }
//   async ngOnInit(): Promise<void> {
//     try {
//       const data = await this.authService.login(this.username, this.password);
//       this.posts = data;
//     } catch (error) {
//       console.error('An error occurred:', error);
// }}

OnSubmit(){
  console.log(this.user);
  this.authService.loginUser(this.user).subscribe(data=>{
    alert("login sucessfully");
    
  },error=> alert("please enter correct userId and password")
  );
}
}