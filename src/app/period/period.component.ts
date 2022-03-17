import { Component, OnInit } from '@angular/core';
import { Period } from './period.model';
import { PeriodService } from './period.service';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.css'],
})
export class PeriodComponent implements OnInit {
  period: Period = new Period(0, '', '', '');
  periods: Period[] = [];

  constructor(private service: PeriodService) {}

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.service.get().subscribe((data) => {
      this.periods = data;
    });
  }

  add() {
    if (this.isValidate()) {
      if (this.period.id == null || this.period.id == 0) {
        console.log('Save');
        this.save(this.period);
      } else {
        this.update(this.period);
      }
    }
  }

  isValidate(): boolean {
    if (this.period.name == '') {
      alert('Anote el nombre');
      return false;
    }
    return true;
  }

  save(period: Period) {
    this.service.add(period).subscribe((response) => {
      this.get();
      this.cancel();
    });
  }

  update(entry: Period) {
    this.service.update(entry).subscribe((response) => {
      this.get();
    });
  }

  edit(id: number) {
    let entry: Period;

    entry = this.periods.find((item) => item.id == id) as Period;
    this.period.id = entry.id;
    this.period.name = entry.name;
    this.period.dateStart = entry.dateStart;
    this.period.dateStop = entry.dateStop;
    //console.log(this.entry);
  }

  cancel() {
    this.period.id = 0;
    this.period.name = '';
    this.period.dateStart = '';
    this.period.dateStop = '';
  }

  delete(period: Period) {
    let label: string;

    label = '¿Desea borrar' + period.name + ' ?';
    if (window.confirm(label)) {
      this.service.delete(period.id).subscribe((response) => {
        this.get();
      });
    }
  }
}
