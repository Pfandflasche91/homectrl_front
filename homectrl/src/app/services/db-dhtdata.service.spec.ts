import { TestBed } from '@angular/core/testing';

import { DbDhtdataService } from './db-dhtdata.service';

describe('DbDhtdataService', () => {
  let service: DbDhtdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbDhtdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
