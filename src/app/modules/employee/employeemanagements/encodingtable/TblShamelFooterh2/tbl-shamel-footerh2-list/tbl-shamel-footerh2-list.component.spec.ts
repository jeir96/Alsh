import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelFooterh2ListComponent } from './tbl-shamel-footerh2-list.component';

describe('TblShamelFooterh2ListComponent', () => {
  let component: TblShamelFooterh2ListComponent;
  let fixture: ComponentFixture<TblShamelFooterh2ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelFooterh2ListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelFooterh2ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
