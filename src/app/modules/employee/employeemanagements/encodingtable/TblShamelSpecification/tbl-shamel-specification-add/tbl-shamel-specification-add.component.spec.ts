import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelSpecificationAddComponent } from './tbl-shamel-specification-add.component';

describe('TblShamelSpecificationAddComponent', () => {
  let component: TblShamelSpecificationAddComponent;
  let fixture: ComponentFixture<TblShamelSpecificationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelSpecificationAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelSpecificationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
