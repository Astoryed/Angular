import { TestBed, inject } from '@angular/core/testing';

import { FrieghtService } from './frieght.service';

describe('FrieghtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FrieghtService]
    });
  });

  it('should be created', inject([FrieghtService], (service: FrieghtService) => {
    expect(service).toBeTruthy();
  }));
});
