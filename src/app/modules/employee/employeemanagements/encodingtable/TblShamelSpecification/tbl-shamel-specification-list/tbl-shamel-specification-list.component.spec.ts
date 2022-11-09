import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelSpecificationListComponent } from './tbl-shamel-specification-list.component';

describe('TblShamelSpecificationListComponent', () => {
  let component: TblShamelSpecificationListComponent;
  let fixture: ComponentFixture<TblShamelSpecificationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelSpecificationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelSpecificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
