import { TestBed } from '@angular/core/testing';

import { AdminProcessService } from './admin-process.service';

describe('AdminProcessService', () => {
  let service: AdminProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
