import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interface/category.interface';
import { CategoryService } from 'src/app/services/category_service/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})

export class EditCategoryComponent implements OnInit {

  categoryReactiveForm: FormGroup;

  categoryDetails: Category = {
    categoryId: 0,
    categoryName: ''
  };

  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private router: Router) {


  }

  ngOnInit(): void {

    this.categoryReactiveForm = new FormGroup({
      categoryName: new FormControl(null,  [Validators.required, Validators.pattern(/^[^0-9]*$/), Validators.minLength(3)])
    });


    this.route.paramMap.subscribe({
      next: (params) => {
        const idString = params.get('categoryId');

        if(idString !== null){
          const id = parseInt(idString);


        if(id){
          this.categoryService.getCategory(id).subscribe({
            next: (response) => {
              this.categoryDetails = response
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
    this.categoryReactiveForm.patchValue({
      categoryName: this.categoryDetails.categoryName
    });
    }

    updateCategory(){
      this.categoryService.updateCategory(this.categoryDetails.categoryId, this.categoryReactiveForm.value)
      .subscribe({
        next: (response) => {
          this.router.navigate(['view/categories']);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }

    deleteCategory(categoryId: number){
      this.categoryService.deleteCategory(categoryId)
      .subscribe({
        next: (response) => {
          this.router.navigate(['view/categories']);

        }
      });
    }
}

