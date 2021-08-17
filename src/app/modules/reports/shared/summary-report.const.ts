export enum BarChartTypes {
  DAILY = "DAY",
  MONTHLY = "MONTH",
  YEARLY = "YEAR",
}

export type ChartType =
  | "line"
  | "bar"
  | "horizontalBar"
  | "radar"
  | "doughnut"
  | "polarArea"
  | "bubble"
  | "pie"
  | "scatter";

export interface IBarChartLabels {
  type: BarChartTypes;
  values: any[];
}

export const WeeklyValues = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const MonthlyValues = [
  {
    value: 0,
    name: "January",
  },
  {
    value: 1,
    name: "February",
  },
  {
    value: 2,
    name: "March",
  },
  {
    value: 3,
    name: "April",
  },
  {
    value: 4,
    name: "May",
  },
  {
    value: 5,
    name: "June",
  },
  {
    value: 6,
    name: "July",
  },
  {
    value: 7,
    name: "August",
  },
  {
    value: 8,
    name: "September",
  },
  {
    value: 9,
    name: "October",
  },
  {
    value: 10,
    name: "November",
  },
  {
    value: 11,
    name: "December",
  },
];

export const selectedMonth = "";

function generateArrayOfYears() {
  const min = new Date("2021").getFullYear();
  const max = min + 10;
  const years = [];

  for (let i = min; i < max; i++) {
    years.push(i);
  }
  return years;
}

export const barChartLabelsConstant: IBarChartLabels[] = [
  {
    type: BarChartTypes.DAILY,
    values: WeeklyValues,
  },
  {
    type: BarChartTypes.MONTHLY,
    values: MonthlyValues,
  },
  {
    type: BarChartTypes.YEARLY,
    values: generateArrayOfYears(),
  },
];
