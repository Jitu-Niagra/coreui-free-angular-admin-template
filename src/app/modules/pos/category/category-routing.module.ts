import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoriesComponent } from "./components/categories/categories.component";
import { EditCategoryComponent } from "./components/edit-category/edit-category.component";
import { CategoryDetailsComponent } from "./components/category-details/category-details.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "all-category",
    pathMatch: "full",
  },
  {
    path: "add-category",
    component: EditCategoryComponent,
    data: {
      title: "Add  a new category",
    },
  },
  {
    path: ":id/edit-category",
    component: EditCategoryComponent,
    data: {
      title: "Edit Category",
    },
  },
  {
    path: "all-category",
    component: CategoriesComponent,
    data: {
      title: "All Category",
    },
  },
  {
    path: ":id/:name",
    component: CategoryDetailsComponent,
    data: {
      title: "Category details",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class CategoryRoutingModule {}
