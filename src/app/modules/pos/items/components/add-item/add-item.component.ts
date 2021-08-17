import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { CategoryService } from "../../../category/service/category.service";
import { ICategory } from "../../../category/shared/category.model";
import { ItemsService } from "../../service/items.service";
import { IItems } from "../../shared/item.model";

@Component({
  selector: "app-add-item",
  templateUrl: "./add-item.component.html",
  styleUrls: ["./add-item.component.scss"],
})
export class AddItemComponent implements OnInit {
  categoryDetails: ICategory[] = [];
  isEdit: boolean = false;
  isLoaded: boolean = false;
  errorMessage: string = "";
  itemEdit: IItems = {
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
  addNewCategory: boolean = false;
  addForm = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    quantity: new FormControl(),
    cost: new FormControl(),
    itemCategory: new FormControl(),
    categoryToAdd: new FormControl(),
  });
  currentStore: any;
  constructor(
    private router: Router,
    private itemsService: ItemsService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCategory();
    this.getItemDetails();
  }

  getCategory() {
    return this.categoryService.getCategorys().subscribe((response) => {
      this.categoryDetails = response.result;
    });
  }
  submitForm(itemForm: any) {
    if (this.itemEdit) {
      const itemId = this.activatedRoute.snapshot.paramMap.get("id");
      this.itemsService
        .editItem(itemId, itemForm.value)
        .subscribe((response) => {
          this.router.navigate(["/pos/items/all-items"]);
        });
    }
    console.log(itemForm.value);
    this.itemsService.addItem(itemForm.value).subscribe((response: any) => {
      this.router.navigate([`pos/items/al-items`]);
      console.log(response);
    });
  }
  addCategory() {
    this.addNewCategory = true;
  }

  getItemDetails() {
    const itemId = this.activatedRoute.snapshot.paramMap.get("id");
    console.log(itemId);
    return this.itemsService.getItem(itemId).subscribe((response) => {
      this.itemEdit = response.result;
      console.log(this.itemEdit);
      this.updateForm();
      this.isLoaded = true;
      this.isEdit = true;
    });
  }

  updateForm() {
    this.addForm.patchValue({
      name: this.itemEdit.name,
      price: this.itemEdit.price,
      cost: this.itemEdit.cost,
      quantity: this.itemEdit.quantity,
      itemCategory: this.itemEdit.itemCategory?._id,
    });
    this.addNewCategory = false;
  }

  editForm(editForm: any) {
    console.log(editForm.value);
  }
}
