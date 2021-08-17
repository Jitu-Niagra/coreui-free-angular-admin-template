import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { ChartType } from "chart.js";
import { Subscription } from "rxjs";
import { ItemsService } from "../../../pos/items/service/items.service";
import { IItems } from "../../../pos/items/shared/item.model";
import {
  IBarChartLabels,
  barChartLabelsConstant,
  BarChartTypes,
  MonthlyValues,
} from "../../../reports/shared/summary-report.const";
import { SalesService } from "../../service/sales.service";

@Component({
  selector: "app-summary-sales",
  templateUrl: "./summary-sales.component.html",
  styleUrls: ["./summary-sales.component.scss"],
})
export class SummarySalesComponent implements OnInit {
  subscription = new Subscription();
  reportDetails: {
    type: string;
    start: number;
    end: number;
    year: number;
    month: number;
  } = {
    type: "",
    start: 0,
    end: 0,
    year: 0,
    month: 0,
  };

  transactionSummary: {
    totalNumberOfTransactions: number;
    totalSales: number;
    totalNumberOfItems: number;
  } = {
    totalNumberOfTransactions: 0,
    totalSales: 0,
    totalNumberOfItems: 0,
  };

  reportSummary: [
    {
      data: [];
      totalNumberOfItems: number;
      totalNumberOfTransactions: number;
      totalSales: number;
      label: string;
    }
  ] = [
    {
      data: [],
      totalNumberOfItems: 0,
      totalNumberOfTransactions: 0,
      totalSales: 0,
      label: "",
    },
  ];

  isLoaded: boolean;
  Items: IItems[] = [];
  barChartLabelsConstant: IBarChartLabels[] = barChartLabelsConstant;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels: string[] = [];
  selectedBarChartLabelType: BarChartTypes = BarChartTypes.YEARLY;

  public barChartType: ChartType = "bar";
  public barChartLegend = true;
  public barChartData = [
    {
      data: [],
      label: "Transactions",
    },
    {
      data: [],
      label: "Sales",
    },
  ];

  selectedYear: string;
  selectedMonth: string;
  selectedWeek: string;

  listOfYears: string[] = [];
  listOfMonths: {
    value: number;
    name: string;
  }[] = [];
  listOfWeeks: string[] = [];

  barChartTypes = BarChartTypes;

  constructor(
    private router: Router,
    private reportSummaryService: SalesService,

    private itemsService: ItemsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getItems();
    this.barChartLabels = this.barChartLabelsConstant.find(
      (x) => x.type === BarChartTypes.YEARLY
    ).values;
    this.listOfYears = this.generateArrayOfYears();
    this.listOfMonths = MonthlyValues;
  }

  generateArrayOfYears() {
    const min = new Date("2021").getFullYear();
    const max = min + 10;
    const years = [];

    for (let i = min; i < max; i++) {
      years.push(i);
    }
    return years;
  }

  getDaysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }

  setBarChartLabels(barChartTypes: BarChartTypes, daysInMonth?: number): void {
    if (barChartTypes === BarChartTypes.DAILY) {
      let daysInMonthArray = Array.from(Array(daysInMonth).keys());
      daysInMonthArray.shift();
      daysInMonthArray = [...daysInMonthArray, daysInMonthArray.length + 1];
      this.barChartLabels = daysInMonthArray.map(String);
      console.log(daysInMonthArray);
      this.reportDetails.start = daysInMonthArray[0];
      this.reportDetails.end = daysInMonthArray[daysInMonthArray.length - 1];
    } else if (barChartTypes === BarChartTypes.MONTHLY) {
      const months = this.barChartLabelsConstant.find(
        (x) => x.type === barChartTypes
      ).values;
      this.barChartLabels = months.map((x) => x.name);
      this.reportDetails.start = this.barChartLabels.indexOf(
        this.barChartLabels[0] + 1
      );
      this.reportDetails.end = this.barChartLabels.indexOf(
        this.barChartLabels[this.barChartLabels.length - 1]
      );
    }
  }

  // changeSelectedChartLabel(barChartLabel: IBarChartLabels): void {
  //   this.selectedBarChartLabelType = barChartLabel.type;
  //   this.getBarChartLabels();
  // }

  getSelectedValue(value, barChartType: BarChartTypes): void {
    const backendParam = value.target.value;
    if (barChartType === BarChartTypes.MONTHLY) {
      this.selectedYear = value.target.value;
      this.selectedMonth = undefined;
      this.setBarChartLabels(barChartType);
      this.reportDetails.type = barChartType;
      this.reportDetails.year = Number(this.selectedYear);
      this.reportDetails.month = this.selectedMonth
        ? Number(this.selectedMonth)
        : 0;
      this.getReport();
    } else if (barChartType === BarChartTypes.DAILY) {
      this.selectedMonth = value.target.value;
      console.log(this.selectedMonth);
      const daysInMonth = this.getDaysInMonth(
        +this.selectedMonth + 1,
        +this.selectedYear
      );
      this.setBarChartLabels(barChartType, daysInMonth);
      this.reportDetails.type = barChartType;
      this.reportDetails.year = Number(this.selectedYear);
      this.reportDetails.month = Number(this.selectedMonth);
      console.log(this.reportDetails);
      this.getReport();
    }
  }

  getReport() {
    this.reportSummaryService
      .getWebReportSummary(this.reportDetails)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.reportSummary = res.result;
          this.barChartData = this.reportSummary.splice(0, 2);
          this.transactionSummary = this.reportSummary.pop();
          this.isLoaded = true;
          console.log(this.reportDetails);
        },
      });
  }

  getItems() {
    this.itemsService.getItems().subscribe({
      next: (res) => {
        this.Items = res.result;
        console.log(this.Items);
      },
    });
  }

  edit(item) {
    this.router.navigate([`/pos/items/${item._id}/edit-item`]);
  }
  back() {
    this.location.back();
  }
}
