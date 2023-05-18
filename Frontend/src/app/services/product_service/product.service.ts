import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Category } from 'src/app/interface/category.interface';
import { Product } from 'src/app/interface/product.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseApiUrl + '/api/Product/Get-Product')
   }

   getProduct(categoryId: number): Observable<Product> {
    return this.http.get<Product[]>(this.baseApiUrl + '/api/Product/Get-Single-Product/' + categoryId)
      .pipe(
        map(response => response[0])
      );

   }

   getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseApiUrl + '/api/Category/Get-Category');
  }

   AddProduct(addProductRequest: Product): Observable<Product>{
    return this.http.post<Product>(this.baseApiUrl + '/api/Product/Add-Product', addProductRequest);
  }

  updateProduct(productId: number, updateProductRequest: Product): Observable<Product>{
    return this.http.put<Product>(this.baseApiUrl + '/api/Product/Update-Product/' + productId, updateProductRequest)
  }

  deleteProduct(productId: number): Observable<Product>{
    return this.http.delete<Product>(this.baseApiUrl + '/api/Product/Delete-Product/' + productId)
  }

  updateProductQuantity(productId: number, quantity: number): Observable<Product> {
    const url = `${this.baseApiUrl}/api/Product/Update-Product-Quantity/${productId}`;
    const requestBody = { remainingQuantity: quantity };

    return this.http.put<Product>(url, requestBody);
  }

  getProductWithHighestSales(): Observable<Product> {
    return this.http.get<Product>(this.baseApiUrl + '/api/Product/Get-Product-With-Highest-Sales') .pipe(
      map(response => response[0])
    );
  }

  getProductWithLowestSales(): Observable<Product> {
    return this.http.get<Product>(this.baseApiUrl + '/api/Product/Get-Product-With-Lowest-Sales') .pipe(
      map(response => response[0])
    );
  }

  getProductWithLowestQuantity(): Observable<Product> {
    return this.http.get<Product>(this.baseApiUrl + '/api/Product/Get-Product-With-Lowest-Quantity') .pipe(
      map(response => response[0])
    );
  }


}


