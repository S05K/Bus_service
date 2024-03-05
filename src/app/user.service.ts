import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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


  get_buses(from: string, to: string, date: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('token', `Bearer ${token}`);
      const params = { from, to, arrival: date }; // Create an object with parameters
      return this.http.get('http://localhost:3000/buses/get_buses', { params, headers });
    } else {
      return new Observable<any>();
    }
  }
  
  get_seats(id:any)
  {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('token', `Bearer ${token}`);
    return this.http.get(`http://localhost:3000/buses/${id}`, {headers});
  } else {
    return new Observable<any>();
  }
  }

  
  total_amount(busId: any,selectedSeats: any[]) {
    const token = localStorage.getItem('token');
    const requestBody: { seats_ids: any[] } = { seats_ids: selectedSeats };
    if (token) {
      const headers = new HttpHeaders().set('token', `Bearer ${token}`);
      return this.http.post(`http://localhost:3000/buses/${busId}/calculate_total_price`, requestBody, { headers });
    } else {
      return new Observable<any>();
    }
  }

  payment(busId: number, selectedSeats: string[]): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('token', `Bearer ${token}`);
    const body = { id: busId, seats_ids: selectedSeats };
    return this.http.post('http://localhost:3000/payments', body, { headers });
  }
  

  clearData() {
    localStorage.clear();
  }


   isUserRegistered():boolean{
    return this.isUser;
  }
}
