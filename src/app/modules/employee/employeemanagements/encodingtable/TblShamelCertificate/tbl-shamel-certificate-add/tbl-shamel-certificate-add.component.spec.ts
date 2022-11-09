import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelCertificateAddComponent } from './tbl-shamel-certificate-add.component';

describe('TblShamelCertificateAddComponent', () => {
  let component: TblShamelCertificateAddComponent;
  let fixture: ComponentFixture<TblShamelCertificateAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelCertificateAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelCertificateAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
