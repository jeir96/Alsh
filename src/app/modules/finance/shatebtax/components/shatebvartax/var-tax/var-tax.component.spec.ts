import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarTaxComponent } from './var-tax.component';

describe('VarTaxComponent', () => {
  let component: VarTaxComponent;
  let fixture: ComponentFixture<VarTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VarTaxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VarTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
