import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit{
data: any;


  constructor(private service:UserService, private fb:FormBuilder, private router: Router) {}
   ngOnInit(): void {
    this.data=this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }
  view_email() {
    this.service.send_otp(this.data.value)
    this.data.reset();
    alert("mail has been sent")
    this.router.navigate(['/otp'])
  }

}
