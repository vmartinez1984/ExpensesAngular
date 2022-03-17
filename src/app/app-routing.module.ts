import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { Category } from './category/category.model';
import { PeriodActiveComponent } from './period-active/period-active.component';
import { PeriodComponent } from './period/period.component';

const routes: Routes = [
  { path: '', component: PeriodActiveComponent },
  { path: 'Periods/Details/:id', component: PeriodActiveComponent },
  { path: 'Periods', component: PeriodComponent },
  { path: 'Categories', component: CategoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
