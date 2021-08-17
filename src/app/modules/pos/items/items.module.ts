import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ItemsRoutingModule } from "./items-routing.module";
import { AllItemsComponent } from "./components/all-items/all-items.component";
import { AddItemComponent } from "./components/add-item/add-item.component";
import { ItemDetailsComponent } from "./components/item-details/item-details.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng2SearchPipeModule } from "ng2-search-filter";

@NgModule({
  declarations: [AllItemsComponent, AddItemComponent, ItemDetailsComponent],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
  ],
})
export class ItemsModule {}
