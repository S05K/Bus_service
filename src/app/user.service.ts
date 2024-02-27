import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private  isUser:boolean=false;
  constructor(private http:HttpClient, private router:Router) { }


  post_data(data:any)
  {
    this.http.post('http://localhost:3000/users', data).subscribe((val)=>{
      this.router.navigate(['/home']);
    })
    this.isUser = true
    return true;
  }

  login(form_data:any)
  {
    this.http.post('http://localhost:3000/auth/login', form_data).subscribe((val:any)=>{
    this.isUser = true
    const token = val.token;
    localStorage.setItem('token', token);
    console.log(token);
    this.router.navigate(['/home']);
    return true;
    })
  }

 
  autoLogin() {
    const token = localStorage.getItem('token');
    if (token) {
      console.log(token);
      this.isUser = true
      this.router.navigate(['/home']);
    }
  }

  send_otp(data:any)
  {
    this.http.post('http://localhost:3000/forgot_passwords',data).subscribe((val)=>{
      console.log(val);
     })
  }

  veify_email( email:any,otp:any,password:any)
  {
    const requestBody = { email,otp,password };
    this.http.put('http://localhost:3000/forgot_passwords/verify_otp',requestBody).subscribe((val)=>{
      console.log(val);
      
    })
  }

  clearData() {
    localStorage.clear();
  }


   isUserRegistered():boolean{
    return this.isUser;
  }
}
