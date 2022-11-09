import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEntryTbLShamelNewPayrolAddComponent } from './main-entry-tbl-shamel-new-payrol-add.component';

describe('MainEntryTbLShamelNewPayrolAddComponent', () => {
  let component: MainEntryTbLShamelNewPayrolAddComponent;
  let fixture: ComponentFixture<MainEntryTbLShamelNewPayrolAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainEntryTbLShamelNewPayrolAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainEntryTbLShamelNewPayrolAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
