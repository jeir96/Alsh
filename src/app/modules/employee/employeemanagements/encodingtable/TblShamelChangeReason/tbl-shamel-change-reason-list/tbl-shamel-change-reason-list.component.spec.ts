import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelChangeReasonListComponent } from './tbl-shamel-change-reason-list.component';

describe('TblShamelChangeReasonListComponent', () => {
  let component: TblShamelChangeReasonListComponent;
  let fixture: ComponentFixture<TblShamelChangeReasonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelChangeReasonListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelChangeReasonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
