import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrolComponent } from './payrol.component';

describe('PayrolComponent', () => {
  let component: PayrolComponent;
  let fixture: ComponentFixture<PayrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
