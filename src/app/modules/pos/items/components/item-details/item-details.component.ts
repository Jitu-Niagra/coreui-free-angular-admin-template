import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ItemsService } from "../../service/items.service";
import { IItems } from "../../shared/item.model";

@Component({
  selector: "app-item-details",
  templateUrl: "./item-details.component.html",
  styleUrls: ["./item-details.component.scss"],
})
export class ItemDetailsComponent implements OnInit {
  isLoaded: boolean;
  itemDetail: IItems = {
    _jd: "",
    name: "",
    itemCategory: {
      _id: "",
      name: "",
    },
    inStock: true,
    price: 0,
    cost: 0,
    quantity: 0,
  };
  subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private itemsService: ItemsService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.isLoaded = false;
    this.getItemDetails();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getItemDetails() {
    // get Item Id
    let itemId = this.activatedRoute.snapshot.paramMap.get("id");
    this.itemsService.getItem(itemId).subscribe((response) => {
      this.itemDetail = response.result;
      this.isLoaded = true;
      console.log(this.itemDetail);
    });
    return itemId;
  }
  editItem(item: any) {
    this.route.navigate([`/pos/items/${item._id}/edit-item`]);
  }
  deleteItem(item: any) {
    this.itemsService
      .deleteItemId(item._id)
      .subscribe((res) => this.route.navigate([`/pos/items`]));
  }
  backItem() {
    this.route.navigate(["/pos/items"]);
  }
}
