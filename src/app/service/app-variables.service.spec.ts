import { TestBed } from '@angular/core/testing';

import { AppVariablesService } from './app-variables.service';

describe('AppVariablesService', () => {
  let service: AppVariablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppVariablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
