import { TestBed } from '@angular/core/testing';

import { Comservices } from './comservices';

describe('ComservicesService', () => {
  let service: Comservices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Comservices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
