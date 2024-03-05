import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css']
})
export class BusComponent implements OnInit {
   processPayment()
      {
        console.log("hello");
        this.service.payment(this.busId,this.selectedSeats).subscribe((val)=>{
          console.log(val);
          this.link=val;
          window.open(this.link.url, '_blank');
          })
      }
  link:any;
  busId: any;
  bus: any;
  seats: any[]=[];
    constructor(private route: ActivatedRoute, private service: UserService) { }
  
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.busId = +params.get('id')!;
        this.service.get_seats(this.busId).subscribe(response => {
          this.bus = response.Bus;
          if (this.bus && this.bus.seats) {
            this.seats = this.bus.seats; 
            console.log(this.seats);
          }
        });
      });
    }

    selectedSeats: any[] = []; 
    totalAmount: any; 

// Method to handle seat selection
selectSeat(seatId: any){
  const index = this.selectedSeats.indexOf(seatId);
  if (index === -1) {
    // Seat is not selected, so add it to the list
    this.selectedSeats.push(seatId);
  } else {
    // Seat is already selected, so remove it from the list
    this.selectedSeats.splice(index, 1);
  }
  console.log(this.selectedSeats);
  
  return this.selectedSeats; 
}


calculateTotalAmount() {
  const busId = this.route.snapshot.paramMap.get('id');
  const selectedSeatsArray = Array.from(this.selectedSeats);
  console.log(selectedSeatsArray);
  this.service.total_amount(busId, selectedSeatsArray).subscribe(
    (response) => {
      this.totalAmount = response;
      console.log('Total amount:', response);
    },
    (error) => {
      console.error('Error calculating total amount:', error);
    }
  );
}
}



