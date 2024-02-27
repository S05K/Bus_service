import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
    
  
  autoLogin() {
    this.service.autoLogin();
  }
  sign_in:any; 
  constructor(private service:UserService, private fb:FormBuilder, private router:Router) {}
  ngOnInit(): void {
    this.sign_in = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }
 
  get_data() {
    this.service.login(this.sign_in.value);
  }


}
