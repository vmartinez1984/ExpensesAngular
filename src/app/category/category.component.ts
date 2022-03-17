import { Component, OnInit } from '@angular/core';
import { Category } from './category.model';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  category: Category = new Category(0, '');

  constructor(private service: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
    //document.getElementById('name')?.focus();
  }

  loadCategories() {
    this.service.get().subscribe(
      response => {
        console.log(response);
        this.categories = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  add() {
    //console.log(this.category);
    if (this.category.name == '') {
      alert('El nombre es requerido');
      document.getElementById('name')?.focus();
    } else {
      if (this.category.id == 0 || this.category.id == null) {
        this.service.add(this.category).subscribe(
          (respose) => {
            this.loadCategories();
            this.category = new Category(0, '');
            console.log(respose);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.service.update(this.category).subscribe(
          (respose) => {
            console.log(respose);
            this.category = new Category(0, '');
            this.loadCategories();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  edit(categoryId: number, categoryName: string) {
    this.category.id = categoryId;
    this.category.name = categoryName;
  }

  delete(categoryId: number, categoryName: string) {
    if (window.confirm('¿Desea borrar ' + categoryName + '?')) {
      this.service.delete(categoryId).subscribe((respose) => {
        this.loadCategories();
      });
    }
  }

  cancel() {
    this.category = new Category(0, '');
  }
}
