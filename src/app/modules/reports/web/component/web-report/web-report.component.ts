import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { OrganizationService } from "../../../../organization/service/organization.service";
import { CategoryService } from "../../../../pos/category/service/category.service";
import { ICategory } from "../../../../pos/category/shared/category.model";
import { CustomersService } from "../../../../pos/customers/service/customers.service";
import { ICustomer } from "../../../../pos/customers/shared/customer.model";
import { ItemsService } from "../../../../pos/items/service/items.service";
import { IItems } from "../../../../pos/items/shared/item.model";
import { ITransaction } from "../../../../sales/models/transaction.model";
import { WebService } from "./../../service/web.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-web-report",
  templateUrl: "./web-report.component.html",
  styleUrls: ["./web-report.component.scss"],
})
export class WebReportComponent implements OnInit {
  subscription = new Subscription();
  isLoaded: boolean = false;
  transactions: [ITransaction] = [
    {
      _id: "",
      status: "",
      paymentTerm: "",
      items: [],
      customer: {
        name: "",
      },
      total: 0,
    },
  ];
  transactionSummary: {
    totalNumberOfTransactions: number;
    totalSales: number;
  } = {
    totalNumberOfTransactions: 0,
    totalSales: 0,
  };
  Items: IItems[] = [];
  customers: ICustomer[] = [];
  categories: ICategory[] = [];
  constructor(
    private reportService: WebService,
    private itemsService: ItemsService,
    private categoryService: CategoryService,
    private customersService: CustomersService,
    private orgService: OrganizationService,
    private route: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTransactionSummary();
    this.getAllTransactions();
    this.getCustomers();
    this.getCategories();
  }

  getTransactionSummary() {
    this.subscription.add(
      this.reportService.getTransactionsSummary().subscribe((res) => {
        console.log(res);
        this.transactionSummary = res.result;
      })
    );
  }

  getAllTransactions() {
    this.reportService.getTransactions().subscribe({
      next: (res) => {
        console.log(res);
        this.transactions = res.result;
      },
    });
  }

  viewTransactionDetails(transaction) {
    console.log(transaction);
    console.log(transaction._id);
    this.route.navigate([`sales/transaction/${transaction._id}/details`]);
  }

  getCategories() {
    this.subscription.add(
      this.categoryService.getCategorys().subscribe({
        next: (res) => {
          this.categories = res.result;
          this.isLoaded = true;
        },
      })
    );
  }
  viewCategory(category) {
    this.route.navigate([`/pos/categories/${category._id}/${category.name}`]);
  }
  getCustomers() {
    this.customersService.getCustomers().subscribe({
      next: (res) => {
        this.customers = res.result;
        console.log(this.customers);
      },
    });
  }
  viewCustomer(customer) {
    console.log(customer);
    this.customersService.getCustomer(customer._id).subscribe((res) => {
      console.log(res);
      this.route.navigate([`pos/customers/${customer._id}/details`]);
    });
  }

  back() {
    this.location.back();
  }
}
