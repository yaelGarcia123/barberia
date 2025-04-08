import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercepcionesDeduccionesComponent } from './percepciones-deducciones.component';

describe('PercepcionesDeduccionesComponent', () => {
  let component: PercepcionesDeduccionesComponent;
  let fixture: ComponentFixture<PercepcionesDeduccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PercepcionesDeduccionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercepcionesDeduccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
