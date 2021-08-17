import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ITransaction } from "../../models/transaction.model";
import { SalesService } from "./../../service/sales.service";

@Component({
  selector: "app-sale-details",
  templateUrl: "./sale-details.component.html",
  styleUrls: ["./sale-details.component.scss"],
})
export class SaleDetailsComponent implements OnInit {
  subscription = new Subscription();
  transaction: ITransaction = {
    _id: "",
    status: "",
    paymentTerm: "",
    items: [],
    customer: {
      name: "",
    },
    total: 0,
    transactionNumber: 0,
  };
  isLoaded: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private salesService: SalesService
  ) {}

  ngOnInit(): void {
    this.isLoaded = false;
    this.getParams();
  }
  ngOnDestroy(): void {}
  getParams() {
    const transactionId = this.route.snapshot.params.id;
    console.log(transactionId);
    this.getTransactionDetails(transactionId);
  }
  getTransactionDetails(transId) {
    this.subscription.add(
      this.salesService.getTransaction(transId).subscribe({
        next: (res) => {
          this.transaction = res.result;
          console.log(res);
          this.isLoaded = true;
        },
      })
    );
  }

  getReceipt(transaction) {
    this.router.navigate([`/sales/transaction/${transaction._id}/receipt`]);
  }
}
