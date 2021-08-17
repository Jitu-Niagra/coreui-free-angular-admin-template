import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ChartType } from "chart.js";
import { Subscription } from "rxjs";
import { ItemsService } from "../../../../pos/items/service/items.service";
import { IItems } from "../../../../pos/items/shared/item.model";
import {
  BarChartTypes,
  MonthlyValues,
  IBarChartLabels,
  barChartLabelsConstant,
} from "../../../shared/summary-report.const";
import { MobileService } from "../../service/mobile.service";

@Component({
  selector: "app-mobile-report",
  templateUrl: "./mobile-report.component.html",
  styleUrls: ["./mobile-report.component.scss"],
})
export class MobileReportComponent implements OnInit {
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
  isLoaded: boolean;
  Items: IItems[] = [];
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
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mobileService: MobileService,
    private itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    this.isLoaded = false;
    this.barChartLabels = this.barChartLabelsConstant.find(
      (x) => x.type === BarChartTypes.YEARLY
    ).values;
    this.listOfYears = this.generateArrayOfYears();
    this.listOfMonths = MonthlyValues;
    this.reportDetails.year = Number(this.listOfYears[0]);
    this.getItems();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

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

  generateArrayOfYears() {
    const min = new Date("2021").getFullYear();
    const max = min + 10;
    const years = [];

    for (let i = min; i < max; i++) {
      years.push(i);
    }
    console.log(years);
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
    }
    console.log(this.barChartLabels);
    this.reportDetails.start = this.barChartLabels.indexOf(
      this.barChartLabels[0] + 1
    );
    this.reportDetails.end = this.barChartLabels.indexOf(
      this.barChartLabels[this.barChartLabels.length - 1]
    );
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
      console.log(this.reportDetails);
      this.getParams();
    } else if (barChartType === BarChartTypes.DAILY) {
      this.selectedMonth = value.target.value;
      console.log(this.selectedMonth);

      const daysInMonth = this.getDaysInMonth(
        +this.selectedMonth + 1,
        +this.selectedYear
      );
      console.log(this.selectedMonth.length);
      this.setBarChartLabels(barChartType, daysInMonth);
      this.reportDetails.type = barChartType;
      this.reportDetails.year = Number(this.selectedYear);
      this.reportDetails.month = Number(this.selectedMonth);
      console.log(this.reportDetails);
      this.getParams();
    }
  }

  getParams() {
    this.route.queryParams.subscribe({
      next: (queryParm) => {
        const reportKey = queryParm.key;
        console.log(reportKey);
        this.getReport(reportKey, this.reportDetails);
      },
    });
  }

  getReport(key, details) {
    this.mobileService.getReportSummary(key, details).subscribe({
      next: (res) => {
        console.log(res);
        this.reportSummary = res.result;
        this.barChartData = this.reportSummary.splice(0, 2);
        this.transactionSummary = this.reportSummary.pop();
        this.isLoaded = true;
        console.log();
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
    this.router.navigate([`/pos/${item._id}/edit`]);
  }
}
