import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealAlertsComponent } from './real-alerts.component';

describe('RealAlertsComponent', () => {
  let component: RealAlertsComponent;
  let fixture: ComponentFixture<RealAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealAlertsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
