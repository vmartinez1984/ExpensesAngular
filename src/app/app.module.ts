import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule } from '@angular/forms';
import { EntryComponent } from './entry/entry.component';
import { ExpenseComponent } from './expense/expense.component';
import { PeriodComponent } from './period/period.component';
import { PeriodActiveComponent } from './period-active/period-active.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    MenuComponent,    
    EntryComponent, 
    ExpenseComponent,
    PeriodComponent,
    PeriodActiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
