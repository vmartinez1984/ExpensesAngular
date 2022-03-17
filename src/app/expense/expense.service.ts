import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from '../const/api.model';
import { Expense } from './expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private httpClient: HttpClient) {}

  get(periodId : number): Observable<any> {
    return this.httpClient.get(Api.urlApiExpenses + "?periodId="+ periodId);
  }

  update(item: Expense): Observable<any> {
    return this.httpClient.put(Api.urlApiExpenses + item.id, item);
  }

  delete(id?: number) {
    return this.httpClient.delete(Api.urlApiExpenses + id);
  }

  add(item : Expense){
    return this.httpClient.post(Api.urlApiExpenses, item);
  }
  
}
