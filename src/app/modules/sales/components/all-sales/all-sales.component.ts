import { Component, OnInit } from "@angular/core";

import { SalesService } from "./../../service/sales.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { ITransaction } from "../../models/transaction.model";

@Component({
  selector: "app-all-sales",
  templateUrl: "./all-sales.component.html",
  styleUrls: ["./all-sales.component.scss"],
})
export class AllSalesComponent implements OnInit {
  transactions: ITransaction[] = [];
  isLoaded: Boolean = false;
  constructor(
    private salesService: SalesService,
    private route: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getAllTransactions();
  }

  getAllTransactions() {
    this.salesService.getTransactions().subscribe({
      next: (res) => {
        this.transactions = res.result;
        this.isLoaded = true;
      },
    });
  }

  viewTransactionDetails(transaction) {
    console.log(transaction);
    console.log(transaction._id);
    this.route.navigate([`sales/transaction/${transaction._id}/details`]);
  }
  back() {
    this.location.back();
  }
}
