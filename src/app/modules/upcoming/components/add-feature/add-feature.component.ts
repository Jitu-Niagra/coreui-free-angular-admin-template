import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { UpcomingService } from "../../service/upcoming.service";

import { Location } from "@angular/common";

@Component({
  selector: "app-add-feature",
  templateUrl: "./add-feature.component.html",
  styleUrls: ["./add-feature.component.scss"],
})
export class AddFeatureComponent implements OnInit, OnDestroy {
  featureForm: FormGroup;
  subscription = new Subscription();
  constructor(
    private location: Location,
    private upcomingService: UpcomingService
  ) {}

  ngOnInit(): void {
    this.formFields();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
  formFields() {
    this.featureForm = new FormGroup({
      title: new FormControl(""),
      description: new FormControl(""),
    });
  }

  submitEvent(formDetails) {
    console.log(formDetails.value);
    this.subscription.add(
      this.upcomingService.addUpcomingEvent(formDetails.value).subscribe({
        next: (res) => {
          console.log(res.result);
          this.location.back();
        },
      })
    );
  }
  cancelEvent() {
    this.location.back();
  }
}
