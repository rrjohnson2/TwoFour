import { TestBed } from '@angular/core/testing';

import { LoaderinterceptService } from './loaderintercept.service';

describe('LoaderinterceptService', () => {
  let service: LoaderinterceptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderinterceptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
