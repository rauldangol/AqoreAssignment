import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/interface/customer.interface';
import { CustomerService } from 'src/app/services/customer_service/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {


  customerReactiveForm: FormGroup;
  fullName: string;
  email: string;

  constructor(private customerService: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.customerReactiveForm = new FormGroup({
      fullName: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  AddCustomer(): void {
    if (this.customerReactiveForm.invalid) {
      return;
    }

    this.fullName = this.customerReactiveForm.value.fullName;
    this.email = this.customerReactiveForm.value.email;

    const customer: Customer = {
      customerId: 0,
      fullName: this.fullName,
      email: this.email
    };

    this.customerService.AddCustomer(customer).subscribe(
      {
        next: () => {
          this.router.navigate(['view/customers']);
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }
}

