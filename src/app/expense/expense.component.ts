import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Category } from '../category/category.model';
import { CategoryService } from '../category/category.service';
import { PeriodService } from '../period/period.service';
import { Expense } from './expense.model';
import { ExpenseService } from './expense.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
})
export class ExpenseComponent implements OnInit {
  categories: Category[] = [];
  periodId: number = 0;
  expenses: Expense[] = [];
  expense: Expense;
  total: number;

  constructor(
    private categoryService: CategoryService,
    private expenseService: ExpenseService,
    private route: ActivatedRoute,
    private periodService: PeriodService
  ) {
    this.assignamentPeriod();
    this.total = 0;
    this.expense = new Expense(0, '', 0, 0, this.periodId);
  }

  ngOnInit(): void {
    this.getCategories();
    this.getExpenses();
  }

  assignamentPeriod() {
    let id;

    id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id == '' || id == null) {
     this.periodService.getActive().subscribe((response) => {
        this.periodId = response.id;
        console.log(this.periodId);
        this.getExpenses();
      });
    } else {
      this.periodId = id as unknown as number;
      //console.log(this.periodId);
      this.getExpenses();
    }
  }

  getCategories() {
    this.categoryService.get().subscribe(data => {
      this.categories = data;
    });
  }

  getExpenses() {
    this.awaitMoment();
    this.expenseService.get(this.periodId).subscribe(data => {      
      console.log(data);
      this.expenses = data;
      this.total = 0;
      this.expenses.forEach((item) => {
        this.total += item.amount;
      });
      Swal.close();
    });
  }

  add() {
    this.expense.periodId = this.periodId;
    if (this.isValidate()) {
      if (this.expense.id == null || this.expense.id == 0) {
        console.log('Save');
        this.save(this.expense);
      } else {
        this.update(this.expense);
      }
    }
  }

  isValidate(): boolean {
    if (this.expense.name == '') {
      Swal.fire('Datos no validos', 'Anote un nombre valido', 'info');
      //document.getElementById("name")?.focus();
      return false;
    }
    if (Number(this.expense.amount) < 1) {
      Swal.fire('Datos no validos', 'Anote una cantidad valida', 'info');
      return false;
    }
    if(this.expense.categoryId == 0){
      Swal.fire('Datos no validos', 'Seleccione una categoria', 'info');
      return false;
    }
    return true;
  }

  save(expense: Expense) {
    this.expenseService.add(expense).subscribe((response) => {
      this.getExpenses();
    });
  }

  update(entry: Expense) {
    this.expenseService.update(entry).subscribe((response) => {
      this.getExpenses();
    });
  }

  edit(id: number) {
    let entry: Expense;

    entry = this.expenses.find((item) => item.id == id) as Expense;
    this.expense.id = entry.id;
    this.expense.name = entry.name;
    this.expense.amount = entry.amount;
    this.expense.categoryId = entry.categoryId;
    //console.log(this.entry);
  }

  cancel() {
    this.expense.id = 0;
    this.expense.name = '';
    this.expense.amount = 0;
    this.expense.categoryId = 0;
  }

  delete(expense: Expense) {
    let label: string;

    label = '¿Desea borrar' + expense.name + ' de ' + expense.amount + ' ?';
    // if (window.confirm(label)) {
    //   this.expenseService.delete(expense.id).subscribe((response) => {
    //     this.getExpenses();
    //   });
    // }
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
        this.expenseService.delete(expense.id).subscribe(
          (response) => {
            this.getExpenses();
          },
          (error) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ah ocurrido un error!',
              footer: 'Intente nuevemente',
            });
          }
        );
      }
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
