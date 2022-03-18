import { Component, OnInit } from '@angular/core';
import { PeriodActiveService } from './period-active.service';

@Component({
  selector: 'app-period-active',
  templateUrl: './period-active.component.html',
  styleUrls: ['./period-active.component.css'],
})
export class PeriodActiveComponent implements OnInit {
  periodId: number;
  balance: number;

  constructor(private service: PeriodActiveService) {
    //this.periodId = 0;
    this.service.getActive().subscribe(
      (data) => {
        //console.log(data);
        this.periodId = data.id;
        this.balance = data.balance;
        //console.log(this.periodId);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
  }
}
