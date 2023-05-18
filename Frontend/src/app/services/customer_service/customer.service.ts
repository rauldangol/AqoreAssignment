import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Customer } from 'src/app/interface/customer.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

getAllCustomers(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.baseApiUrl + '/api/Customer/Get-Customer')
   }


getCustomer(customerId: number): Observable<Customer> {
  return this.http.get<Customer[]>(this.baseApiUrl + '/api/Customer/Get-Single-Customer/' + customerId)
    .pipe(
      map(response => response[0]) );
}

AddCustomer(addCustomerRequest: Customer): Observable<Customer>{
  return this.http.post<Customer>(this.baseApiUrl + '/api/Customer/Add-Customer', addCustomerRequest);
}

updateCustomer(customerId: number, updateCustomerRequest: Customer): Observable<Customer>{
  return this.http.put<Customer>(this.baseApiUrl + '/api/Customer/Update-Customer/' + customerId, updateCustomerRequest)
}

deleteCustomer(customerId: number): Observable<Customer>{
  return this.http.delete<Customer>(this.baseApiUrl + '/api/Customer/Delete-Customer/' + customerId)
}

}

