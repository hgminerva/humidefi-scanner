import { TestBed } from '@angular/core/testing';

import { PolkadotService } from './polkadot.service';

describe('PolkadotService', () => {
  let service: PolkadotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolkadotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
