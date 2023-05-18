import { Component} from '@angular/core';
import { Category } from 'src/app/interface/category.interface';
import { CategoryService } from 'src/app/services/category_service/category.service';

@Component({
  selector: 'app-get-category',
  templateUrl: './get-category.component.html',
  styleUrls: ['./get-category.component.css']
})
export class GetCategoryComponent{

  categories: Category[] = [];
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories()
    .subscribe({
      next: (response) => {
        this.categories = response;
        console.log(response);
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
}
