import { Router } from '@angular/router';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AboutComponent } from './about.component';
import { MaterialAppModule } from '../shared/material.app.module';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialAppModule],
      declarations: [AboutComponent],
      providers: [
          Router
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
