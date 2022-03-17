import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeriodService } from '../period/period.service';
import { Entry } from './entry.model';
import { EntryService } from './entry.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
})
export class EntryComponent implements OnInit {
  entry: Entry;
  entries: Entry[] = [];
  periodId: number;
  total: number = 0;

  constructor(
    private service: EntryService,
    private route: ActivatedRoute,
    private periodService: PeriodService
  ) {
    this.assignamentPeriod();
    this.entry = new Entry(0, '', 0, this.periodId);
  }

  ngOnInit(): void {}

  assignamentPeriod() {
    let id;

    id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id == '' || id == null) {
     this.periodService.getActive().subscribe((response) => {
        this.periodId = response.id;
        console.log(this.periodId);
        this.get();
      });
    } else {
      this.periodId = id as unknown as number;
      //console.log(this.periodId);
      this.get();
    }
  }

  getActive() {}

  get() {
    this.service.get(this.periodId).subscribe((response) => {
      this.entries = response;
      this.total = 0;
      this.entries.forEach((element) => {
        this.total += element.amount;
      });
    });
  }

  add() {
    this.entry.periodId = this.periodId;
    if (this.isValidate()) {      
      if (this.entry.id == null || this.entry.id == 0) {
        console.log('Save');
        this.save(this.entry);
      } else {
        this.update(this.entry);
      }
    }
  }

  isValidate(): boolean {
    if (this.entry.name == '') {
      alert('Anote el nombre');
      return false;
    }
    if (Number(this.entry.amount) < 0) {
      alert('Anote una cantidad valida');
      return false;
    }
    return true;
  }

  save(entry: Entry) {
    this.service.add(entry).subscribe((response) => {
      this.cancel();      
      this.get();
    });
  }
  
  update(entry: Entry) {
    this.service.update(entry).subscribe((response) => {
      this.cancel();      
      this.get();
    });
  }

  edit(entryId: number) {
    let entry: Entry;

    entry = this.entries.find((item) => item.id == entryId) as Entry;
    this.entry.id = entry.id;
    this.entry.name = entry.name;
    this.entry.amount = entry.amount;
    //console.log(this.entry);
  }

  cancel() {
    this.entry.id = 0;
    this.entry.name = '';
    this.entry.amount = 0;
  }

  delete(entry: Entry) {
    let label: string;

    label = '¿Desea borrar' + entry.name + ' de ' + entry.amount + ' ?';
    if (window.confirm(label)) {
      this.service.delete(entry.id).subscribe((response) => {
        this.get();
      });
    }
  }
}
