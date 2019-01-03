import { TestBed, inject } from '@angular/core/testing';

import { BookerService } from './booker.service';

describe('BookerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookerService]
    });
  });

  it('should be created', inject([BookerService], (service: BookerService) => {
    expect(service).toBeTruthy();
  }));
});
