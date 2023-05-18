import { Component } from '@angular/core';
import { Customer } from 'src/app/interface/customer.interface';
import { CustomerService } from 'src/app/services/customer_service/customer.service';

@Component({
  selector: 'app-get-customer',
  templateUrl: './get-customer.component.html',
  styleUrls: ['./get-customer.component.css']
})
export class GetCustomerComponent {

  customers: Customer[] = [];
  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getAllCustomers()
    .subscribe({
      next: (response) => {
        this.customers = response;
        console.log(response);
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
}
