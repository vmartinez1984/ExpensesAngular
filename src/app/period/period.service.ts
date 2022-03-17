import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from '../const/api.model';
import { Period } from './period.model';

@Injectable({
  providedIn: 'root',
})
export class PeriodService {
  constructor(private httpCliente: HttpClient) {}

  add(period: Period): Observable<any> {
    return this.httpCliente.post(Api.urlApiPeriods, period);
  }

  get(): Observable<any> {
    return this.httpCliente.get(Api.urlApiPeriods);
  }

  getActive(): Observable<any>{
    return this.httpCliente.get(Api.urlApiPeriods+"Active");
  }

  update(period: Period) {
    return this.httpCliente.put(Api.urlApiPeriods + period.id, period);
  }

  delete(id : number){
    return this.httpCliente.delete(Api.urlApiPeriods + id);
  }
}
