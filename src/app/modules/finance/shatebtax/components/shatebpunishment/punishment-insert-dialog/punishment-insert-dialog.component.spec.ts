import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PunishmentInsertDialogComponent } from './punishment-insert-dialog.component';

describe('PunishmentInsertDialogComponent', () => {
  let component: PunishmentInsertDialogComponent;
  let fixture: ComponentFixture<PunishmentInsertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PunishmentInsertDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PunishmentInsertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
