import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit{
  data: any;
  constructor(private fb:FormBuilder, private service: UserService, private router:Router) {}
 
  ngOnInit(): void {
   this.data = this.fb.group({
    otp1: ['', Validators.required],
    otp2: ['', Validators.required],
    otp3: ['', Validators.required],
    otp4: ['', Validators.required],
    otp5: ['', Validators.required],
    otp6: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
   })
  }
  verifyOTP() {
    const otp = this.data.value.otp1 + this.data.value.otp2 + this.data.value.otp3 + this.data.value.otp4 + this.data.value.otp5 + this.data.value.otp6
    const email = this.data.value.email;
    const password = this.data.value.password;
    
    console.log('OTP:', otp);
    console.log('Email:', email);
    console.log('Password:', password);
    this.service.veify_email(email, otp, password)
    this.router.navigate(['/login'])
    alert("password has been updated")
    this.data.reset();
  }
  
}
