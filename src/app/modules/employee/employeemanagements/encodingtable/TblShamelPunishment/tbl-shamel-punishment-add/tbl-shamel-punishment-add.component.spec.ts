import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelPunishmentAddComponent } from './tbl-shamel-punishment-add.component';

describe('TblShamelPunishmentAddComponent', () => {
  let component: TblShamelPunishmentAddComponent;
  let fixture: ComponentFixture<TblShamelPunishmentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelPunishmentAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelPunishmentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
