import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Customer } from 'src/app/interface/customer.interface';
import { Invoice } from 'src/app/interface/invoice.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getAllInvoice(): Observable<Invoice[]>{
    return this.http.get<Invoice[]>(this.baseApiUrl + '/api/Invoice/Get-Invoice')
   }

   getInvoice(invoiceId: number): Observable<Invoice> {
    return this.http.get<Invoice[]>(this.baseApiUrl + '/api/Invoice/Get-Single-Invoice/' + invoiceId)
      .pipe(
        map(response => response[0])
      );

   }

  getCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseApiUrl + '/api/Customer/Get-Customer');
  }

   AddInvoice(addInvoiceRequest: Invoice): Observable<Invoice>{
    return this.http.post<Invoice>(this.baseApiUrl + '/api/Invoice/Add-Invoice', addInvoiceRequest);
  }

  updateInvoice(invoiceId: number, updateInvoicerequest: Invoice): Observable<Invoice>{
    return this.http.put<Invoice>(this.baseApiUrl + '/api/Invoice/Update-Invoice/' + invoiceId, updateInvoicerequest)
  }

  deleteInvoice(invoiceId: number): Observable<Invoice>{
    return this.http.delete<Invoice>(this.baseApiUrl + '/api/Invoice/Delete-Invoice/' + invoiceId)
  }

}

