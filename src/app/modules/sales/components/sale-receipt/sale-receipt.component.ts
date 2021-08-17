import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SalesService } from "./../../service/sales.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-sale-receipt",
  templateUrl: "./sale-receipt.component.html",
  styleUrls: ["./sale-receipt.component.scss"],
})
export class SaleReceiptComponent implements OnInit {
  transaction: any;
  transactionDetails: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private salesService: SalesService
  ) {}

  ngOnInit(): void {
    this.getParams();
  }

  getParams() {
    const transactionId = this.route.snapshot.paramMap.get("id");
    console.log(transactionId);
    this.getTransactionDetails(transactionId);
  }

  getTransactionDetails(id) {
    this.salesService.getTransaction(id).subscribe({
      next: (res) => {
        this.transaction = res;
        this.transactionDetails = this.transaction.result;
        console.log(this.transactionDetails);
      },
    });
  }
  printPage() {
    window.print();
  }
  back() {
    this.location.back();
  }
}
