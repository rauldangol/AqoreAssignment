import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/interface/customer.interface';
import { Invoice } from 'src/app/interface/invoice.interface';
import { InvoiceService } from 'src/app/services/invoice_service/invoice.service';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent {

  invoiceReactiveForm: FormGroup;
  customerId: number;
  invoiceDate: string;
  totalAmount: number;
  discount: number;
  discountedAmount: number;
  customer: Customer[] = [];



  constructor(private invoiceService: InvoiceService, private router: Router) {}

  ngOnInit(): void {
    this.invoiceReactiveForm = new FormGroup({
      customerId: new FormControl(null, Validators.required),
      invoiceDate: new FormControl(new Date().toISOString().substring(0, 10)),
      totalAmount: new FormControl(null, [ Validators.required, Validators.min(0)]),
      discount: new FormControl(null, [ Validators.required, Validators.min(0), Validators.max(1)]),
      discountedAmount: new FormControl(null, [ Validators.required, Validators.min(0)])
    });

    this.fetchCustomer();



  }

  fetchCustomer(): void {
    this.invoiceService.getCustomer().subscribe(
      customers => {
        this.customer = customers;
      },
      error => {
        console.log(error);
      }
    );
  }

    AddInvoice(): void {
    if (this.invoiceReactiveForm.invalid) {
      return;
    }

    this.customerId = this.invoiceReactiveForm.value.customerId;
    this.invoiceDate = this.invoiceReactiveForm.value.invoiceDate;
    this.totalAmount = this.invoiceReactiveForm.value.totalAmount;
    this.discount = this.invoiceReactiveForm.value.discount;
    this.discountedAmount = this.invoiceReactiveForm.value.discountedAmount;

    const Invoice: Invoice = {
      invoiceId: 0,
      customerId: this.customerId,
      invoiceDate: this.invoiceDate,
      totalAmount: this.totalAmount,
      discount: this.discount,
      discountedAmount: this.discountedAmount
    };

    this.invoiceService.AddInvoice(Invoice).subscribe(
      {
        next: () => {
          this.router.navigate(['view/invoice']);
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }
}
