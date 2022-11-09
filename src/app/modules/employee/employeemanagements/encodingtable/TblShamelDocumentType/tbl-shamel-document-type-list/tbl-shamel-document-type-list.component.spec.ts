import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelDocumentTypeListComponent } from './tbl-shamel-document-type-list.component';

describe('TblShamelDocumentTypeListComponent', () => {
  let component: TblShamelDocumentTypeListComponent;
  let fixture: ComponentFixture<TblShamelDocumentTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelDocumentTypeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelDocumentTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
