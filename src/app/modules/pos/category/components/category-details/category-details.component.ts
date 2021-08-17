import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryService } from "../../service/category.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-category-details",
  templateUrl: "./category-details.component.html",
  styleUrls: ["./category-details.component.scss"],
})
export class CategoryDetailsComponent implements OnInit {
  isLoaded: boolean;
  category: { name: string; _id?: string; numberOfItems: number } = {
    name: "",
    _id: "",
    numberOfItems: 0,
  };
  categoryItems: any = {};
  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.isLoaded = false;
    this.getCategory();
  }

  getCategory() {
    const categoryId = this.route.snapshot.params.id;
    console.log(categoryId);
    this.categoryService.getCategory(categoryId).subscribe((response) => {
      console.log(response);
      this.category = response.result;
      this.isLoaded = true;
    });
  }

  backCategory() {
    this.router.navigate(["pos/categories"]);
  }
  editCategory(category: any) {
    this.router.navigate([`/pos/categories/${category._id}/edit`]);
  }
  deleteCategory(category: any) {
    console.log(category._id);
    this.categoryService.deleteCategory(category._id).subscribe((response) => {
      console.log(response);
      this.router.navigate(["/pos/categories"]);
    });
  }
}
