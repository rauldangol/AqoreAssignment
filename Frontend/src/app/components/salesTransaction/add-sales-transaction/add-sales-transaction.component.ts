import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/interface/customer.interface';
import { Product } from 'src/app/interface/product.interface';
import { SalesTransaction } from 'src/app/interface/salesTransaction.interface';
import { ProductService } from 'src/app/services/product_service/product.service';
import { SalesTransactionService } from 'src/app/services/salesTransaction_service/sales-transaction.service';

@Component({
  selector: 'app-add-sales-transaction',
  templateUrl: './add-sales-transaction.component.html',
  styleUrls: ['./add-sales-transaction.component.css']
})
export class AddSalesTransactionComponent {

  transactionReactiveForm: FormGroup;
  customerId: number;
  productId: number;
  quantity: number;
  transactionDate: string;
  customer: Customer[] = [];
  product: Product[] = [];



  constructor(private salesTransactionService: SalesTransactionService, private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.transactionReactiveForm = new FormGroup({
      customerId: new FormControl(null, Validators.required),
      productId: new FormControl(null, Validators.required),
      quantity: new FormControl(null, [Validators.required, Validators.min(1)]),
      transactionDate: new FormControl(null, Validators.required)
    });

    this.fetchCustomer();
    this.fetchProduct();

  }

  fetchCustomer(): void {
    this.salesTransactionService.getCustomer().subscribe(
      customers => {
        this.customer = customers;
      },
      error => {
        console.log(error);
      }
    );
  }

  fetchProduct(): void {
    this.salesTransactionService.getProduct().subscribe(
      product => {
        this.product = product;
      },
      error => {
        console.log(error);
      }
    );
  }


    AddSalesTransaction(): void {
    if (this.transactionReactiveForm.invalid) {
      return;
    }

    this.customerId = this.transactionReactiveForm.value.customerId;
    this.productId = this.transactionReactiveForm.value.productId;
    this.quantity = this.transactionReactiveForm.value.quantity;
    this.transactionDate = this.transactionReactiveForm.value.transactionDate;

    const SalesTransaction: SalesTransaction = {
      transactionId: 0,
      customerId: this.customerId,
      productId: this.productId,
      quantity: this.quantity,
      transactionDate: this.transactionDate
    };

    this.salesTransactionService.AddSalesTransaction(SalesTransaction).subscribe(
      {
        next: () => {
          this.productService.updateProductQuantity(this.productId, this.quantity).subscribe(
            {
              next: () => {
                this.router.navigate(['view/sales-transactions']);
              },
              error: (error) => {
                console.log(error);
              }
            }
          );
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }
}
