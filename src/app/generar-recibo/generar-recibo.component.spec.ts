import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarReciboComponent } from './generar-recibo.component';

describe('GenerarReciboComponent', () => {
  let component: GenerarReciboComponent;
  let fixture: ComponentFixture<GenerarReciboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerarReciboComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerarReciboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
