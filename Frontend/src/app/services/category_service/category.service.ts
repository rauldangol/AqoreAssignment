import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Category } from 'src/app/interface/category.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.baseApiUrl + '/api/Category/Get-Category')
   }


getCategory(categoryId: number): Observable<Category> {
  return this.http.get<Category[]>(this.baseApiUrl + '/api/Category/Get-Single-Category/' + categoryId)
    .pipe(
      map(response => response[0])
    );

}

AddCategory(addCategoryRequest: Category): Observable<Category>{
  return this.http.post<Category>(this.baseApiUrl + '/api/Category/Add-Category', addCategoryRequest);
}

updateCategory(categoryId: number, updateCategoryRequest: Category): Observable<Category>{
  return this.http.put<Category>(this.baseApiUrl + '/api/Category/Update-Category/' + categoryId, updateCategoryRequest)
}

deleteCategory(categoryId: number): Observable<Category>{
  return this.http.delete<Category>(this.baseApiUrl + '/api/Category/Delete-Category/' + categoryId)
}

}
