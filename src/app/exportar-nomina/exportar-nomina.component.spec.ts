import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportarNominaComponent } from './exportar-nomina.component';

describe('ExportarNominaComponent', () => {
  let component: ExportarNominaComponent;
  let fixture: ComponentFixture<ExportarNominaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportarNominaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportarNominaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
