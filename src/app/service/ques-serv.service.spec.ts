import { TestBed } from '@angular/core/testing';

import { QuesServService } from './ques-serv.service';

describe('QuesServService', () => {
  let service: QuesServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuesServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
