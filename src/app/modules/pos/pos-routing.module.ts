import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "items",
    pathMatch: "full",
  },
  {
    path: "items",
    loadChildren: () =>
      import("./items/items.module").then((m) => m.ItemsModule),
  },
  {
    path: "categories",
    loadChildren: () =>
      import("./category/category.module").then((m) => m.CategoryModule),
  },
  {
    path: "customers",
    loadChildren: () =>
      import("./customers/customers.module").then((m) => m.CustomersModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PosRoutingModule {}
