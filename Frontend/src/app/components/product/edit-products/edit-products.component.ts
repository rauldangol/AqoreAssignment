import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interface/category.interface';
import { Product } from 'src/app/interface/product.interface';
import { ProductService } from 'src/app/services/product_service/product.service';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent {

  productReactiveForm: FormGroup;
  productDetails: Product = {
    productId: 0,
    categoryId: 0,
    productName: '',
    price: 0,
    remainingQuantity: 0
  };
  categories: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productReactiveForm = new FormGroup({
      categoryId: new FormControl(null, Validators.required),
      productName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      price: new FormControl(null, [Validators.required, Validators.min(0)]),
      remainingQuantity: new FormControl(null, [Validators.required, Validators.min(0)])
    });

    this.fetchCategories();

    this.route.paramMap.subscribe({
      next: (params) => {
        const idString = params.get('productId');

        if (idString !== null) {
          const id = parseInt(idString);

          if (id) {
            this.productService.getProduct(id).subscribe({
              next: (response) => {
                this.productDetails = response;
                console.log(response);
                this.populateForm();
              }
            });
          }
        }
      }
    });
  }

  fetchCategories(): void {
    this.productService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private populateForm(): void {
    this.productReactiveForm.patchValue({
      categoryId: this.productDetails.categoryId,
      productName: this.productDetails.productName,
      price: this.productDetails.price,
      remainingQuantity: this.productDetails.remainingQuantity
    });
  }

  updateProduct(): void {
    this.productService.updateProduct(this.productDetails.productId, this.productReactiveForm.value)
      .subscribe({
        next: (response) => {
          this.router.navigate(['view/products']);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId)
      .subscribe({
        next: (response) => {
          this.router.navigate(['view/products']);
        }
      });
  }
}
