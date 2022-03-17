import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from '../const/api.model';

@Injectable({
  providedIn: 'root'
})
export class PeriodActiveService {

  constructor(private httpClient: HttpClient) { }

  getActive(): Observable<any>{
    return this.httpClient.get(Api.urlApiPeriods+"Active");
  }
}
