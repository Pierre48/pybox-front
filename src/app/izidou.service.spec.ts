import { TestBed } from '@angular/core/testing';

import { IzidouService } from './izidou.service';

describe('IzidouService', () => {
  let service: IzidouService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IzidouService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
