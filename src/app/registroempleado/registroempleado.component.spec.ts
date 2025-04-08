import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroempleadoComponent } from './registroempleado.component';

describe('RegistroempleadoComponent', () => {
  let component: RegistroempleadoComponent;
  let fixture: ComponentFixture<RegistroempleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroempleadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroempleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
