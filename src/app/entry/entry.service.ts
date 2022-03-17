import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from '../const/api.model';
import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  constructor(private httpClient: HttpClient) {}

  get(periodId : number): Observable<any> {
    return this.httpClient.get(Api.urlApiEntries + "?periodId="+ periodId);
  }

  update(entry: Entry): Observable<any> {
    return this.httpClient.put(Api.urlApiEntries + entry.id, entry);
  }

  delete(entryId?: number) {
    return this.httpClient.delete(Api.urlApiEntries + entryId);
  }

  add(entry : Entry){
    return this.httpClient.post(Api.urlApiEntries, entry);
  }
}
