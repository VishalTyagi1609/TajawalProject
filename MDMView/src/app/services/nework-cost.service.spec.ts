import { TestBed, inject } from '@angular/core/testing';

import { NeworkCostService } from './nework-cost.service';

describe('NeworkCostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NeworkCostService]
    });
  });

  it('should be created', inject([NeworkCostService], (service: NeworkCostService) => {
    expect(service).toBeTruthy();
  }));
});
