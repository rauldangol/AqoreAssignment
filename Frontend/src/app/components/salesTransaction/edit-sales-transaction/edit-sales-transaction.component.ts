import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/interface/customer.interface';
import { Product } from 'src/app/interface/product.interface';
import { SalesTransaction } from 'src/app/interface/salesTransaction.interface';
import { SalesTransactionService } from 'src/app/services/salesTransaction_service/sales-transaction.service';

@Component({
  selector: 'app-edit-sales-transaction',
  templateUrl: './edit-sales-transaction.component.html',
  styleUrls: ['./edit-sales-transaction.component.css']
})
export class EditSalesTransactionComponent {


  transactionReactiveForm: FormGroup;
  transactionDetails: SalesTransaction = {
    transactionId:0,
    customerId: 0,
    productId: 0,
    quantity: 0,
    transactionDate:''
  };
  customers: Customer[] = [];
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private salesTransactionService: SalesTransactionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.transactionReactiveForm = new FormGroup({
      customerId: new FormControl(null, Validators.required),
      productId: new FormControl(null, Validators.required),
      quantity: new FormControl(null, [Validators.required, Validators.min(1)]),
      transactionDate: new FormControl(null, [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)])
    });

    this.fetchCustomer();
    this.fetchProduct();

    this.route.paramMap.subscribe({
      next: (params) => {
        const idString = params.get('transactionId');

        if (idString !== null) {
          const id = parseInt(idString);

          if (id) {
            this.salesTransactionService.getSalesTransaction(id).subscribe({
              next: (response) => {
                this.transactionDetails = response;
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
    this.salesTransactionService.getCustomer().subscribe(
      (customers) => {
        this.customers = customers;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fetchProduct(): void {
    this.salesTransactionService.getProduct().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private populateForm(): void {
    this.transactionReactiveForm.patchValue({
      customerId: this.transactionDetails.customerId,
      productId: this.transactionDetails.productId,
      quantity: this.transactionDetails.quantity,
      transactionDate: this.transactionDetails.transactionDate
    });
  }

  updateSalesTransaction(): void {
    this.salesTransactionService.updateSalesTransaction(this.transactionDetails.transactionId, this.transactionReactiveForm.value)
      .subscribe({
        next: (response) => {
          this.router.navigate(['view/sales-transactions']);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  deleteSalesTransaction(transactionId: number): void {
    this.salesTransactionService.deleteSalesTransaction(transactionId)
      .subscribe({
        next: (response) => {
          this.router.navigate(['view/sales-transactions']);
        }
      });
  }
}
