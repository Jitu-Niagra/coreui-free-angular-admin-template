import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddItemComponent } from "./components/add-item/add-item.component";
import { AllItemsComponent } from "./components/all-items/all-items.component";
import { ItemDetailsComponent } from "./components/item-details/item-details.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "all-items",
    pathMatch: "full",
  },
  {
    path: "all-items",
    component: AllItemsComponent,
    data: {
      title: "Items",
    },
  },
  {
    path: "add-item",
    component: AddItemComponent,
    data: {
      title: "Add  a new item",
    },
  },
  {
    path: ":id/edit-item",
    component: AddItemComponent,
    data: {
      title: "Edit item",
    },
  },
  {
    path: ":id/details",
    component: ItemDetailsComponent,
    data: {
      title: "Item Details",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsRoutingModule {}
