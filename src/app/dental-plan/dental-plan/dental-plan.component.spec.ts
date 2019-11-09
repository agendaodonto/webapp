import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DentalPlanComponent } from './dental-plan.component';

describe('DentalPlanComponent', () => {
  let component: DentalPlanComponent;
  let fixture: ComponentFixture<DentalPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DentalPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DentalPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
