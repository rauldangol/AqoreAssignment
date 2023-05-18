import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Customer } from 'src/app/interface/customer.interface';
import { Product } from 'src/app/interface/product.interface';
import { SalesTransaction } from 'src/app/interface/salesTransaction.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SalesTransactionService {


  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getAllSalesTransactions(): Observable<SalesTransaction[]>{
    return this.http.get<SalesTransaction[]>(this.baseApiUrl + '/api/SalesTransaction/Get-Sales-Transaction')
   }

   getSalesTransaction(transactionId: number): Observable<SalesTransaction> {
    return this.http.get<SalesTransaction[]>(this.baseApiUrl + '/api/SalesTransaction/Get-Single-Sales-Transaction/' + transactionId)
      .pipe(
        map(response => response[0])
      );

   }

   getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseApiUrl + '/api/Product/Get-Product');
  }

  getCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseApiUrl + '/api/Customer/Get-Customer');
  }


   AddSalesTransaction(addTransactionRequest: SalesTransaction): Observable<SalesTransaction>{
    return this.http.post<SalesTransaction>(this.baseApiUrl + '/api/SalesTransaction/Add-Sales-Transaction', addTransactionRequest);
  }

  updateSalesTransaction(transactionId: number, updateTransactionRequest: Product): Observable<SalesTransaction>{
    return this.http.put<SalesTransaction>(this.baseApiUrl + '/api/SalesTransaction/Update-Sales-Transaction/' + transactionId, updateTransactionRequest)
  }

  deleteSalesTransaction(transactionId: number): Observable<SalesTransaction>{
    return this.http.delete<SalesTransaction>(this.baseApiUrl + '/api/SalesTransaction/Delete-Sales-Transaction/' + transactionId)
  }

  getTopThreeTransactions(): Observable<SalesTransaction[]> {
    return this.http.get<SalesTransaction[]>(this.baseApiUrl + '/api/SalesTransaction/Get-Top-Three-Transactions'
    );
  }

}


