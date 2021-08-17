import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CategoryRoutingModule } from "./category-routing.module";
import { CategoryDetailsComponent } from "./components/category-details/category-details.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { EditCategoryComponent } from "./components/edit-category/edit-category.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng2SearchPipeModule } from "ng2-search-filter";

@NgModule({
  declarations: [
    CategoryDetailsComponent,
    CategoriesComponent,
    EditCategoryComponent,
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
  ],
})
export class CategoryModule {}
