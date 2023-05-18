import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/interface/customer.interface';
import { Invoice } from 'src/app/interface/invoice.interface';
import { InvoiceService } from 'src/app/services/invoice_service/invoice.service';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css']
})
export class EditInvoiceComponent {

  invoiceReactiveForm: FormGroup;
  invoiceDetails: Invoice = {
    invoiceId:0,
    customerId: 0,
    invoiceDate:'',
    totalAmount: 0,
    discount: 0,
    discountedAmount: 0
  };
  customers: Customer[] = [];

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.invoiceReactiveForm = new FormGroup({
      customerId: new FormControl(null, Validators.required),
      invoiceDate: new FormControl(null, Validators.required),
      totalAmount: new FormControl(null, [ Validators.required, Validators.min(0)]),
      discount: new FormControl(null, [ Validators.required, Validators.min(0), Validators.max(1)]),
      discountedAmount: new FormControl(null, [ Validators.required, Validators.min(0)])
    });

    this.fetchCustomer();

    this.route.paramMap.subscribe({
      next: (params) => {
        const idString = params.get('invoiceId');

        if (idString !== null) {
          const id = parseInt(idString);

          if (id) {
            this.invoiceService.getInvoice(id).subscribe({
              next: (response) => {
                this.invoiceDetails = response;
                console.log(response);
                this.populateForm();
              }
            });
          }
        }
      }
    });
  }

  fetchCustomer(): void {
    this.invoiceService.getCustomer().subscribe(
      (customers) => {
        this.customers = customers;
      },
      (error) => {
        console.log(error);
      }
    );
  }


  private populateForm(): void {
    this.invoiceReactiveForm.patchValue({
      customerId: this.invoiceDetails.customerId,
      invoiceDate: this.invoiceDetails.invoiceDate,
      totalAmount: this.invoiceDetails.totalAmount,
      discount: this.invoiceDetails.discount,
      discountedAmount: this.invoiceDetails.discountedAmount
    });
  }

  updateInvoice(): void {
    this.invoiceService.updateInvoice(this.invoiceDetails.invoiceId, this.invoiceReactiveForm.value)
      .subscribe({
        next: (response) => {
          this.router.navigate(['view/invoice']);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  deleteInvoice(invoiceId: number): void {
    this.invoiceService.deleteInvoice(invoiceId)
      .subscribe({
        next: (response) => {
          this.router.navigate(['view/invoice']);
        }
      });
  }
}
