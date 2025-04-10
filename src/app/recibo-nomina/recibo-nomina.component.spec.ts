import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciboNominaComponent } from './recibo-nomina.component';

describe('ReciboNominaComponent', () => {
  let component: ReciboNominaComponent;
  let fixture: ComponentFixture<ReciboNominaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReciboNominaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReciboNominaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
