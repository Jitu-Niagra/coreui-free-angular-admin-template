import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IItems } from "../../../items/shared/item.model";
import { CategoryService } from "../../service/category.service";
import { ICategory } from "../../shared/category.model";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent implements OnInit {
  categorySearch: any;
  categorys: ICategory[] = [];
  items: IItems[] = [];
  isLoaded: boolean;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoaded = false;
    this.getCategorys();
    console.log(localStorage.getItem("auth_token"));
  }

  getCategorys() {
    this.categoryService.getCategorys().subscribe((response) => {
      this.categorys = response.result;
      console.log(response);
      this.isLoaded = true;
      console.log(this.categorys);
    });
  }

  addCategory() {
    // console.log(category.value)
    this.router.navigate([`/pos/add-category`]);
  }

  editCategory(category: any) {
    console.log(category._id);
    this.router.navigate([`pos/categories/${category._id}/edit-category`]);
  }
  back() {
    this.router.navigate(["pos/categories/all-items"]);
  }

  viewCategory(category: any) {
    this.router.navigate([`/pos/categories/${category._id}/${category.name}`]);
  }
}
