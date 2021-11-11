import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { Product } from '../models/product';

import { ShoppingCart } from './shoppingCart.service';

describe('ShoppingCart', () => {
  let service: ShoppingCart;
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingCart);
    service.addProduct({ id: 3, productName: "Pepsi", quantity: 3 });
    scheduler = new TestScheduler((received, expected) => {
      expect(received).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('addProduct() on first push returns input product', () => {
    const product: Product = { id: 1, productName: "Lego Star Wars toy", quantity: 1 };
    const result = service.addProduct(product);

    scheduler.run(({ expectObservable }) => {
      const expect = '(a|)';
      expectObservable(result).toBe(expect, { a: product });
    });
  });

  it('addProduct() on duplicate product adding returns updated product', () => {
    const product: Product = { id: 3, productName: "Pepsi", quantity: 2 };
    const expectedProduct: Product = { id: 3, productName: "Pepsi", quantity: 5 };
    const result = service.addProduct(product);

    scheduler.run(({ expectObservable }) => {
      const expect = '(a|)';
      expectObservable(result).toBe(expect, { a: expectedProduct });
    });
  });

  it('addProduct() adds new product to products$ observable', () => {
    const legoProduct: Product = { id: 1, productName: "Lego Star Wars toy", quantity: 1 };
    const pepsiProduct: Product = { id: 3, productName: "Pepsi", quantity: 3 };
    service.addProduct(legoProduct);

    service.products$.subscribe(products => expect(products).toEqual([pepsiProduct, legoProduct]));

    // scheduler.run(({ expectObservable }) => {
    //   const expect = '(a|)';
    //   expectObservable(service.products$).toBe(expect, { a: pepsiProduct });
    // });
  });

  it('addProduct() updates existing product in products$ observable', () => {
    const expectedPepsiProduct: Product = { id: 3, productName: "Pepsi", quantity: 4 };
    service.addProduct({ id: 3, productName: "Pepsi", quantity: 1 });
    service.products$.subscribe(products => expect(products).toEqual([expectedPepsiProduct]));
  });

  it('removeProduct() for existing product returns true', () => {
    const product: Product = { id: 3, productName: "Pepsi", quantity: 1 };
    const result = service.removeProduct(product);

    scheduler.run(({ expectObservable }) => {
      const expect = '(a|)';
      expectObservable(result).toBe(expect, { a: true });
    });
  });

  it('removeProduct() for not existing product returns false', () => {
    const product: Product = { id: 1, productName: "Lego Star Wars toy", quantity: 1 };
    const result = service.removeProduct(product);

    scheduler.run(({ expectObservable }) => {
      const expect = '(a|)';
      expectObservable(result).toBe(expect, { a: false });
    });
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
