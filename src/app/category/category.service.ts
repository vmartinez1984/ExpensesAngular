import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './category.model';
import { Observable } from 'rxjs';
import { Api } from '../const/api.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  Api: string = Api.urlBase + '/categories/';

  constructor(private httpClient: HttpClient) {}

  add(category: Category): Observable<any> {
    return this.httpClient.post(this.Api, category);
  }

  delete(categoryId: number) {
    return this.httpClient.delete(this.Api + categoryId);
  }

  get(): Observable<any> {
    return this.httpClient.get(this.Api);
  }

  update(category: Category) {
    return this.httpClient.put(this.Api + category.id, category);
  }
}
