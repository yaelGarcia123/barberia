import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminproveedoresComponent } from './adminproveedores.component';

describe('AdminproveedoresComponent', () => {
  let component: AdminproveedoresComponent;
  let fixture: ComponentFixture<AdminproveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminproveedoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminproveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
