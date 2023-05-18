import { Component } from '@angular/core';
import { Product } from 'src/app/interface/product.interface';
import { ProductService } from 'src/app/services/product_service/product.service';

@Component({
  selector: 'app-get-products',
  templateUrl: './get-products.component.html',
  styleUrls: ['./get-products.component.css']
})
export class GetProductsComponent {

  products: Product[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts()
    .subscribe({
      next: (response) => {
        this.products = response;
        console.log(response);
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
}

