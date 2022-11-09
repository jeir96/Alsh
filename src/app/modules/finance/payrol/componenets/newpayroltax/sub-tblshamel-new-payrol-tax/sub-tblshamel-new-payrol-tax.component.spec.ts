import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTBLShamelNewPayrolTaxComponent } from './sub-tblshamel-new-payrol-tax.component';

describe('SubTBLShamelNewPayrolTaxComponent', () => {
  let component: SubTBLShamelNewPayrolTaxComponent;
  let fixture: ComponentFixture<SubTBLShamelNewPayrolTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubTBLShamelNewPayrolTaxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubTBLShamelNewPayrolTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
