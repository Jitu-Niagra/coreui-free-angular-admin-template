import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { CategoryService } from "../../service/category.service";

@Component({
  selector: "app-edit-category",
  templateUrl: "./edit-category.component.html",
  styleUrls: ["./edit-category.component.scss"],
})
export class EditCategoryComponent implements OnInit {
  category: FormGroup;
  categoryDetails: { name: string; _id?: string } = {
    name: "",
    _id: "",
  };
  isEdit: boolean = false;
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

    private location: Location
  ) {}

  ngOnInit(): void {
    this.category = new FormGroup({
      name: new FormControl(),
    });
    this.getCategoryDetails();
  }

  addCategory(category: any) {
    console.log(this.category.value);
    this.categoryService.addCategory(category.value).subscribe((response) => {
      this.router.navigate(["/pos/categories"]);
    });
  }

  back() {
    this.location.back();
  }

  getCategoryDetails() {
    const categoryId = this.activatedRoute.snapshot.paramMap.get("id");
    if (categoryId) {
      this.categoryService.getCategory(categoryId).subscribe((response) => {
        console.log(response);
        this.categoryDetails = response.result;
        this.category.patchValue({
          name: this.categoryDetails.name,
        });
      });
      this.isEdit = true;
    }

    console.log(categoryId);
  }
}
