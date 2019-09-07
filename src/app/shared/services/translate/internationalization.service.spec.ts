import { TestBed } from '@angular/core/testing';

import { InternationalizationService } from './internationalization.service';

describe('InternationalizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InternationalizationService = TestBed.get(InternationalizationService);
    expect(service).toBeTruthy();
  });
});
