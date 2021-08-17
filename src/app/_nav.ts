import { INavData } from "@coreui/angular";

export const navItems: INavData[] = [
  {
    name: "Dashboard",
    url: "sales/sales-summary",
    icon: "fa fa-users",
  },
  {
    name: " Items List ",
    url: "pos/items",
    icon: "fa fa-shopping-cart",
  },
  {
    name: "Item Categories",
    url: "pos/categories",
    icon: "fa fa-bookmark",
  },
  {
    name: "Customers",
    url: "pos/customers",
    icon: "fa fa-users",
  },

  {
    name: "Sales",
    url: "sales/all-sales",
    icon: "fa fa-money",
  },

  {
    name: "Reports",
    url: "/web-report",
    icon: "fa fa-bar-chart",
  },
  {
    name: "Upcoming",
    url: "/upcoming",
    icon: "fa fa-thumb-tack",
  },
  {
    name: "Settings",
    url: "settings",
    icon: "fa fa-cog",
    children: [
      {
        name: "Stores",
        url: "/settings/manage",
        icon: "fa fa-globe",
      },
    ],
  },
];
