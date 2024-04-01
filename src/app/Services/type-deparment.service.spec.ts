import { TestBed } from '@angular/core/testing';

import { TypeDeparmentService } from './type-deparment.service';

describe('TypeDeparmentService', () => {
  let service: TypeDeparmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeDeparmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
