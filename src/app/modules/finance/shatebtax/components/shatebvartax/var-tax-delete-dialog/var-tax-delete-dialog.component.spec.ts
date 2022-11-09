import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarTaxDeleteDialogComponent } from './var-tax-delete-dialog.component';

describe('VarTaxDeleteDialogComponent', () => {
  let component: VarTaxDeleteDialogComponent;
  let fixture: ComponentFixture<VarTaxDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VarTaxDeleteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VarTaxDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
