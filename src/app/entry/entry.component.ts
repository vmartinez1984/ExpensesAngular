import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
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
    this.awaitMoment();
    this.service.get(this.periodId).subscribe(
      (response) => {
        this.entries = response;
        this.total = 0;
        this.entries.forEach((element) => {
          this.total += element.amount;
        });
        Swal.close();
      },
      (error) => {
        console.log(error);
        this.anErrorOcurred();
      }
    );
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
      Swal.fire('Datos no validos', 'Anote un nombre valido', 'info');
      document.getElementById('name')?.focus();
      return false;
    }
    if (Number(this.entry.amount) < 1) {
      Swal.fire('Datos no validos', 'Anote una cantidad valida', 'info');
      document.getElementById('amount')?.focus();
      return false;
    }
    return true;
  }

  save(entry: Entry) {
    this.awaitMoment();
    this.service.add(entry).subscribe(
      (response) => {
        this.cancel();
        Swal.close();
        this.get();
      },
      (error) => {
        console.log(error);
        this.anErrorOcurred();
      }
    );
  }

  update(entry: Entry) {
    this.awaitMoment();
    this.service.update(entry).subscribe(
      (response) => {
        this.cancel();
        Swal.close();
        this.get();
      },
      (error) => {
        console.log(error);
        this.anErrorOcurred();
      }
    );
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

    label = '¿Desea borrar ' + entry.name + ' de ' + entry.amount + '?';
    Swal.fire({
      title: label,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(entry.id).subscribe(
          (response) => {
            this.get();
          },
          (error) => {
            console.log(error);
            this.anErrorOcurred();
          }
        );
      }
    });
  }

  anErrorOcurred() {
    Swal.fire({
      title: 'Ocurrio un error',
      icon: 'error',
    });
  }

  awaitMoment() {
    Swal.fire({
      icon: 'info',
      title: 'Un momento por favor...',
      allowOutsideClick: false,
      showConfirmButton: false,
    });
  }
}
