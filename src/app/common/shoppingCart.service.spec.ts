import { TestBed } from '@angular/core/testing';

import { ShoppingCart } from './shoppingCart.service';

describe('ShoppingCart', () => {
  let service: ShoppingCart;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingCart);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
