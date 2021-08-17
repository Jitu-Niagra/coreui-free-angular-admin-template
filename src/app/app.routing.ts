import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Import Containers
import { AuthGuard } from "./modules/authentication/guard/auth.guard";
import { DefaultLayoutComponent } from "./containers/default-layout/default-layout.component";
export const routes: Routes = [
  {
    path: "",
    redirectTo: "pos",
    pathMatch: "full",
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./modules/authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: "organization",
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import("./modules/organization/organization.module").then(
        (m) => m.OrganizationModule
      ),
  },
  {
    path: "",
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: {
      title: "Home",
    },
    children: [
      {
        path: "",
        redirectTo: "pos",
        pathMatch: "full",
      },
      {
        path: "pos",
        loadChildren: () =>
          import("./modules/pos/pos.module").then((m) => m.PosModule),
        data: {
          title: "Point of Sale",
        },
      },
      {
        path: "upcoming",
        loadChildren: () =>
          import("./modules/upcoming/upcoming.module").then(
            (m) => m.UpcomingModule
          ),
      },
      {
        path: "settings",
        loadChildren: () =>
          import("./modules/settings/settings.module").then(
            (m) => m.SettingsModule
          ),
      },
      {
        path: "upcoming",
        loadChildren: () =>
          import("./modules/upcoming/upcoming.module").then(
            (m) => m.UpcomingModule
          ),
      },
      {
        path: "user",
        loadChildren: () =>
          import("./modules/user/user.module").then((m) => m.UserModule),
      },
    ],
  },
  {
    path: "mobile",
    loadChildren: () =>
      import("./modules/reports/mobile/mobile.module").then(
        (m) => m.MobileModule
      ),
    canDeactivate: [AuthGuard],
  },
  {
    path: "sales",
    loadChildren: () =>
      import("./modules/sales/sales.module").then((m) => m.SalesModule),
    canActivate: [AuthGuard],
  },
  {
    path: "web-report",
    loadChildren: () =>
      import("./modules/reports/web/web.module").then((m) => m.WebModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],

  exports: [RouterModule],
})
export class AppRoutingModule {}
