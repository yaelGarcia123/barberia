import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincomprasComponent } from './admincompras.component';

describe('AdmincomprasComponent', () => {
  let component: AdmincomprasComponent;
  let fixture: ComponentFixture<AdmincomprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmincomprasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmincomprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
