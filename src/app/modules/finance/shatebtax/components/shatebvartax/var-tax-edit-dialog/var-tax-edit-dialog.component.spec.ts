import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarTaxEditDialogComponent } from './var-tax-edit-dialog.component';

describe('VarTaxEditDialogComponent', () => {
  let component: VarTaxEditDialogComponent;
  let fixture: ComponentFixture<VarTaxEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VarTaxEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VarTaxEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
