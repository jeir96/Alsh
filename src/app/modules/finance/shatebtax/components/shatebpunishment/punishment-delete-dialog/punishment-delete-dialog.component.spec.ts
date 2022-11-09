import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PunishmentDeleteDialogComponent } from './punishment-delete-dialog.component';

describe('PunishmentDeleteDialogComponent', () => {
  let component: PunishmentDeleteDialogComponent;
  let fixture: ComponentFixture<PunishmentDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PunishmentDeleteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PunishmentDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
