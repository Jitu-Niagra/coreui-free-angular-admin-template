import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarySalesComponent } from './summary-sales.component';

describe('SummarySalesComponent', () => {
  let component: SummarySalesComponent;
  let fixture: ComponentFixture<SummarySalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummarySalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarySalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
