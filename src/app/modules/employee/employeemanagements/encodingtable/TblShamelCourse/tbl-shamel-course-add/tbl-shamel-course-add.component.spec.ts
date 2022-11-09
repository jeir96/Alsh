import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelCourseAddComponent } from './tbl-shamel-course-add.component';

describe('TblShamelCourseAddComponent', () => {
  let component: TblShamelCourseAddComponent;
  let fixture: ComponentFixture<TblShamelCourseAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelCourseAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelCourseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
