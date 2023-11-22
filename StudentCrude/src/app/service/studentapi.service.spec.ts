import { TestBed } from '@angular/core/testing';

import { StudentapiService } from './studentapi.service';

describe('StudentapiService', () => {
  let service: StudentapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
