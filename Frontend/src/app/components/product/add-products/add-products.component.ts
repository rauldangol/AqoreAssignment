import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/interface/category.interface';
import { Product } from 'src/app/interface/product.interface';
import { ProductService } from 'src/app/services/product_service/product.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {

  productReactiveForm: FormGroup;
  categoryId: number;
  productName: string;
  price: number;
  remainingQuantity: number;
  categories: Category[];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productReactiveForm = new FormGroup({
      categoryId: new FormControl(null, Validators.required),
      productName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      price: new FormControl(null, [Validators.required, Validators.min(0)]),
      remainingQuantity: new FormControl(null, [Validators.required, Validators.min(0)])
    });

    this.fetchCategories();

  }

  fetchCategories(): void {
    this.productService.getCategories().subscribe(
      categories => {
        this.categories = categories;
      },
      error => {
        console.log(error);
      }
    );
  }


  AddProduct(): void {
    if (this.productReactiveForm.invalid) {
      return;
    }

    this.categoryId = this.productReactiveForm.value.categoryId;
    this.productName = this.productReactiveForm.value.productName;
    this.price = this.productReactiveForm.value.price;
    this.remainingQuantity = this.productReactiveForm.value.remainingQuantity;

    const product: Product = {
      productId: 0,
      categoryId: this.categoryId,
      productName: this.productName,
      price: this.price,
      remainingQuantity: this.remainingQuantity
    };

    this.productService.AddProduct(product).subscribe(
      {
        next: () => {
          this.router.navigate(['view/products']);
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }
}
