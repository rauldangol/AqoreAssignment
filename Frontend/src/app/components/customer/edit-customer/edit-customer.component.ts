import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/interface/customer.interface';
import { CustomerService } from 'src/app/services/customer_service/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  customerReactiveForm: FormGroup;

  customerDetails: Customer = {
    customerId: 0,
    fullName: '',
    email: ''
  };

  constructor(private route: ActivatedRoute, private customerService: CustomerService, private router: Router) {


  }

  ngOnInit(): void {

    this.customerReactiveForm = new FormGroup({
      fullName: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      email: new FormControl(null, [Validators.required, Validators.email])
    });


    this.route.paramMap.subscribe({
      next: (params) => {
        const idString = params.get('customerId');

        if(idString !== null){
          const id = parseInt(idString);


        if(id){
          this.customerService.getCustomer(id).subscribe({
            next: (response) => {
              this.customerDetails = response
              console.log(response);
              this.populateForm();
            }
          });
        }
      }
    }
    });
  }

  private populateForm(): void {
    this.customerReactiveForm.patchValue({
      fullName: this.customerDetails.fullName,
      email: this.customerDetails.email
    });

    }

    updateCustomer(){
      this.customerService.updateCustomer(this.customerDetails.customerId, this.customerReactiveForm.value)
      .subscribe({
        next: (response) => {
          this.router.navigate(['view/customers']);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }

    deleteCustomer(customerId: number){
      this.customerService.deleteCustomer(customerId)
      .subscribe({
        next: (response) => {
          this.router.navigate(['view/customers']);

        }
      });
    }
}
