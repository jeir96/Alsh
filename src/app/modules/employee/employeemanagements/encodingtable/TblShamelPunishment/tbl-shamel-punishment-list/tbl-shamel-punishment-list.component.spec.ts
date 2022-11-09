import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelPunishmentListComponent } from './tbl-shamel-punishment-list.component';

describe('TblShamelPunishmentListComponent', () => {
  let component: TblShamelPunishmentListComponent;
  let fixture: ComponentFixture<TblShamelPunishmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelPunishmentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelPunishmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
