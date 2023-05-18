import { Component } from '@angular/core';
import { Invoice } from 'src/app/interface/invoice.interface';
import { InvoiceService } from 'src/app/services/invoice_service/invoice.service';

@Component({
  selector: 'app-get-invoice',
  templateUrl: './get-invoice.component.html',
  styleUrls: ['./get-invoice.component.css']
})
export class GetInvoiceComponent {

  invoice: Invoice[] = [];
  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.invoiceService.getAllInvoice()
    .subscribe({
      next: (response) => {
        this.invoice = response;
        console.log(response);
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
}
