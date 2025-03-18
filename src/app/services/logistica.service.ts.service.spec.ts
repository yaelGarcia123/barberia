import { TestBed } from '@angular/core/testing';

import { LogisticaServiceTsService } from './logistica.service.ts.service';

describe('LogisticaServiceTsService', () => {
  let service: LogisticaServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogisticaServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
