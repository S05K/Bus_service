import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
constructor(private service:UserService, private router:Router) {}
  Logout() {
   this.service.clearData()
    this.router.navigate(['/login'])
  }

}
