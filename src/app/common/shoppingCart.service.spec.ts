import { TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';
import { Product } from '../models/product';

import { ShoppingCartService } from './shoppingCart.service';

describe('ShoppingCart', () => {
  let service: ShoppingCartService;
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingCartService);
    service.addProduct({ id: 3, productName: "Pepsi", quantity: 3 });
    scheduler = new TestScheduler((received, expected) => {
      expect(received).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('addProduct() adds new product to products$ observable', () => {
    const legoProduct: Product = { id: 1, productName: "Lego Star Wars toy", quantity: 1 };
    const pepsiProduct: Product = { id: 3, productName: "Pepsi", quantity: 3 };
    service.addProduct(legoProduct);
    service.products$.subscribe(products => expect(products).toEqual([pepsiProduct, legoProduct]));
  });

  it('addProduct() updates existing product in products$ observable', () => {
    const expectedPepsiProduct: Product = { id: 3, productName: "Pepsi", quantity: 4 };
    service.addProduct({ id: 3, productName: "Pepsi", quantity: 1 });
    service.products$.subscribe(products => expect(products).toEqual([expectedPepsiProduct]));
  });

  it('removeProduct() removes product from products$ observable', () => {
    const pepsiProduct: Product = { id: 3, productName: "Pepsi", quantity: 3 };
    service.removeProduct(pepsiProduct);
    service.products$.subscribe(products => expect(products).toEqual([]));
  });

  it('removeProduct() updates existing product in products$ observable', () => {
    const pepsiProduct: Product = { id: 3, productName: "Pepsi", quantity: 1 };
    const expectedPepsiProduct: Product = { id: 3, productName: "Pepsi", quantity: 2 };
    service.removeProduct(pepsiProduct);
    service.products$.subscribe(products => expect(products).toEqual([expectedPepsiProduct]));
  });

});
