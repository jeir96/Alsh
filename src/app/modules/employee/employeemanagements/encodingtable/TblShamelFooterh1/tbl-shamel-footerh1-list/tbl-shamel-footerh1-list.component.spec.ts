import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelFooterh1ListComponent } from './tbl-shamel-footerh1-list.component';

describe('TblShamelFooterh1ListComponent', () => {
  let component: TblShamelFooterh1ListComponent;
  let fixture: ComponentFixture<TblShamelFooterh1ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelFooterh1ListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelFooterh1ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
