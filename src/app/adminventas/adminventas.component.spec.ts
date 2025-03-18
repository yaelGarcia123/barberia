import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminventasComponent } from './adminventas.component';

describe('AdminventasComponent', () => {
  let component: AdminventasComponent;
  let fixture: ComponentFixture<AdminventasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminventasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminventasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
