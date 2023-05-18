import { Component } from '@angular/core';
import { SalesTransaction } from 'src/app/interface/salesTransaction.interface';
import { SalesTransactionService } from 'src/app/services/salesTransaction_service/sales-transaction.service';

@Component({
  selector: 'app-get-sales-transactions',
  templateUrl: './get-sales-transactions.component.html',
  styleUrls: ['./get-sales-transactions.component.css']
})
export class GetSalesTransactionsComponent {

  transactions: SalesTransaction[] = [];
  constructor(private salesTransactionService: SalesTransactionService) {}

  ngOnInit(): void {
    this.salesTransactionService.getAllSalesTransactions()
    .subscribe({
      next: (response) => {
        this.transactions = response;
        console.log(response);
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
}
