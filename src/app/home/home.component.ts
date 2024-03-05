import { Component, ElementRef, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  data:any;
  buses:any;
 
book() {
  console.log("hello");
  if (this.buses && this.buses.length > 0) {
    const id = this.buses[0].id;
    console.log(id);
    this.router.navigate(['bus', id]);
  } else {
    console.error("Invalid bus ID");
  }
}
  
  

 
    search() {
      const { from, to, date } = this.data.value; 
      this.service.get_buses(from, to, date).subscribe((val) => {
        this.buses = val.Buses;
        console.log(this.buses);
      });
    }
    
  constructor(
    private service:UserService, 
    private router:Router, 
    private fb:FormBuilder,
    private elementRef: ElementRef,
    private activate: ActivatedRoute
    ) {
  
  }
  ngAfterViewInit(): void {
    this.setMinDate();
  }

  setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    this.elementRef.nativeElement.querySelector('#date').min = today;
  }

  ngOnInit(): void {
    this.data = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      date:  ['', Validators.required]
    })
  }
  
  Logout() {
   this.service.clearData()
    this.router.navigate(['/login'])
  }

 

}
