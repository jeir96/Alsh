import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PunishmentEditDialogComponent } from './punishment-edit-dialog.component';

describe('PunishmentEditDialogComponent', () => {
  let component: PunishmentEditDialogComponent;
  let fixture: ComponentFixture<PunishmentEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PunishmentEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PunishmentEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
