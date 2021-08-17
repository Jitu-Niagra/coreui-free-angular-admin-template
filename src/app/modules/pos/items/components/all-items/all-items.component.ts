import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ItemsService } from "../../service/items.service";
import { IItems } from "../../shared/item.model";

@Component({
  selector: "app-all-items",
  templateUrl: "./all-items.component.html",
  styleUrls: ["./all-items.component.scss"],
})
export class AllItemsComponent implements OnInit {
  itemSearch: any;
  items: IItems[] = [];
  itemEdit: any;
  isLoaded: boolean;
  subscription = new Subscription();

  constructor(private itemsService: ItemsService, private router: Router) {}

  ngOnInit(): void {
    this.isLoaded = false;
    this.getItems();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  getItems(): void {
    this.subscription.add(
      this.itemsService.getItems().subscribe((response) => {
        this.items = response.result;
        console.log(this.items);
        console.log("success");
        this.isLoaded = true;
      })
    );
  }

  viewItem(itemId: any): void {
    this.router.navigate([`/pos/items/${itemId}/details`]);
  }

  editItem(item: any): void {
    this.router.navigate([`/pos/items/${item._id}/edit-item`]);
  }
  deleteItem(itemId: any) {
    console.log(itemId);
    this.subscription.add(
      this.itemsService.deleteItemId(itemId).subscribe((res) => {
        console.log(res);
        // this.location.reload()
      })
    );
  }
  addItem(): void {
    this.router.navigate([`/pos/items/add-item`]);
  }
}
