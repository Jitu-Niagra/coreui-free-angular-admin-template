import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileReportComponent } from './mobile-report.component';

describe('MobileReportComponent', () => {
  let component: MobileReportComponent;
  let fixture: ComponentFixture<MobileReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
