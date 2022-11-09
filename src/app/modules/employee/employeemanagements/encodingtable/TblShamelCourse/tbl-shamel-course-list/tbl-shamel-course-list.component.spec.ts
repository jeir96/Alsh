import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelCourseListComponent } from './tbl-shamel-course-list.component';

describe('TblShamelCourseListComponent', () => {
  let component: TblShamelCourseListComponent;
  let fixture: ComponentFixture<TblShamelCourseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelCourseListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
