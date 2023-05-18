import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/interface/category.interface';
import { CategoryService } from 'src/app/services/category_service/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  categoryReactiveForm: FormGroup;
  categoryName: string;

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.categoryReactiveForm = new FormGroup({
      categoryName: new FormControl(null,  [Validators.required, Validators.pattern(/^[^0-9]*$/), Validators.minLength(3)])
    });
  }

  AddCategory(): void {
    if (this.categoryReactiveForm.invalid) {
      return;
    }

    this.categoryName = this.categoryReactiveForm.value.categoryName;

    const category: Category = {
      categoryId: 0,
      categoryName: this.categoryName
    };

    this.categoryService.AddCategory(category).subscribe(
      {
        next: () => {
          this.router.navigate(['view/categories']);
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }
}
