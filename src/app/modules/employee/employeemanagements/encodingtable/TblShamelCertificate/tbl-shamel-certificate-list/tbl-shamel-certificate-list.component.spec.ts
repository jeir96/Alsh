import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelCertificateListComponent } from './tbl-shamel-certificate-list.component';

describe('TblShamelCertificateListComponent', () => {
  let component: TblShamelCertificateListComponent;
  let fixture: ComponentFixture<TblShamelCertificateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelCertificateListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelCertificateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
