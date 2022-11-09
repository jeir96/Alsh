import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarTaxInsertDialogComponent } from './var-tax-insert-dialog.component';

describe('VarTaxInsertDialogComponent', () => {
  let component: VarTaxInsertDialogComponent;
  let fixture: ComponentFixture<VarTaxInsertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VarTaxInsertDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VarTaxInsertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
