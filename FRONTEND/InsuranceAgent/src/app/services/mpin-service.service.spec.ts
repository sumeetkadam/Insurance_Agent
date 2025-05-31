import { TestBed } from '@angular/core/testing';

import { MpinServiceService } from './mpin-service.service';

describe('MpinServiceService', () => {
  let service: MpinServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MpinServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
