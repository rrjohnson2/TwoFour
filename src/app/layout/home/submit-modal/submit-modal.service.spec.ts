import { TestBed } from '@angular/core/testing';

import { SubmitModalService } from './submit-modal.service';

describe('SubmitModalService', () => {
  let service: SubmitModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmitModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
