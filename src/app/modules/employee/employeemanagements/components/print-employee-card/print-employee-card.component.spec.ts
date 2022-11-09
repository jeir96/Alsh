import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintEmployeeCardComponent } from './print-employee-card.component';

describe('PrintEmployeeCardComponent', () => {
  let component: PrintEmployeeCardComponent;
  let fixture: ComponentFixture<PrintEmployeeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintEmployeeCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintEmployeeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
