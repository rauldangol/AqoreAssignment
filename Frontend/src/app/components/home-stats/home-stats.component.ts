import { Component } from '@angular/core';
import { Invoice } from 'src/app/interface/invoice.interface';
import { Product } from 'src/app/interface/product.interface';
import { SalesTransaction } from 'src/app/interface/salesTransaction.interface';
import { ProductService } from 'src/app/services/product_service/product.service';
import { SalesTransactionService } from 'src/app/services/salesTransaction_service/sales-transaction.service';

@Component({
  selector: 'app-home-stats',
  templateUrl: './home-stats.component.html',
  styleUrls: ['./home-stats.component.css']
})
export class HomeStatsComponent {


  transactionDetails : SalesTransaction[] = [];

  highestProductDetails: Product = {
    productId: 0,
    categoryId: 0,
    productName: '',
    price: 0,
    remainingQuantity: 0
  }

  lowestProductDetails: Product = {
    productId: 0,
    categoryId: 0,
    productName: '',
    price: 0,
    remainingQuantity: 0
  }

  lowestQuantityProductDetails: Product = {
    productId: 0,
    categoryId: 0,
    productName: '',
    price: 0,
    remainingQuantity: 0
  }

  invoiceDetails: Invoice = {
    invoiceId: 0,
    customerId: 0,
    invoiceDate: '',
    totalAmount: 0,
    discount: 0,
    discountedAmount: 0
  }

  constructor(private productService: ProductService, private salesTransactionServic: SalesTransactionService){
  }
   ngOnInit(): void{
    this.fetchHighestSalesProduct();
    this.fetchLowestSalesProduct();
    this.fetchLowestQuantityProduct();
    this.fetchTopThreeTransactions();
   }


fetchHighestSalesProduct(): void {
  this.productService.getProductWithHighestSales().subscribe({
    next: (response) => {
      this.highestProductDetails = response
    },
    error: (err) => {
      console.log(err)
    }
  });
}

fetchLowestSalesProduct(): void {
  this.productService.getProductWithLowestSales().subscribe({
    next: (response) => {
      this.lowestProductDetails = response
      console.log(response)
    },
    error: (err) => {
      console.log(err)
    }
  });
}

fetchLowestQuantityProduct(): void {
  this.productService.getProductWithLowestQuantity().subscribe({
    next: (response) => {
      this.lowestQuantityProductDetails = response
      console.log(response)
    },
    error: (err) => {
      console.log(err)
    }
  });
}

fetchTopThreeTransactions(): void {
  this.salesTransactionServic.getTopThreeTransactions().subscribe({
    next: (response) => {
      this.transactionDetails = response
      console.log(response)
    },
    error: (err) => {
      console.log(err)
    }
  });
}
}
