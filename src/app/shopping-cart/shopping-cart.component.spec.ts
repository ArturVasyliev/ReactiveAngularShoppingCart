import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing'
import { removeProducts, ShoppingCartComponent } from './shopping-cart.component';
import { throttleTime } from 'rxjs/operators';
import { ShoppingCart } from '../common/shoppingCart.service';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Product } from '../models/product';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;
  const products = [
    { id: 1, productName: "Lego Star Wars toy", quantity: 1 },
    { id: 2, productName: "MacBook Air M1", quantity: 1 },
    { id: 3, productName: "Pepsi", quantity: 1 },
    { id: 4, productName: "Call of Duty PS5", quantity: 1 },
    { id: 5, productName: "Spider-Man: No Way Home ticket", quantity: 1 }
  ];

  beforeEach(async () => {
    
    const shoppingCartFake = jasmine.createSpyObj(
      'ShoppingCart', ['addProduct', 'removeProduct'], {products$: of(products)});
    shoppingCartFake.addProduct.and.returnValue(of({ id: 3, productName: "Pepsi", quantity: 1 }));
    shoppingCartFake.removeProduct.and.returnValue(of(true));

    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartComponent ],
      providers: [ { provide: ShoppingCart, useValue: shoppingCartFake } ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show all products in view', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    component.products$.subscribe(products => expect(products.length).toEqual(rows.length));
  });

  it('removeProduct() should add product with quantity 1 to the Subject', () => {
    const inputProduct = { id: 2, productName: "MacBook Air M1", quantity: 2 };
    const expectedProduct = { id: 2, productName: "MacBook Air M1", quantity: 1 };
    
    component['removeStream$'].subscribe(prod => expect(prod).toEqual(expectedProduct));
    component.removeProduct(inputProduct);
  });

});

describe('RemoveProducts Marble Testing', () => {
  let scheduler: TestScheduler;
  //let shoppingCart: ShoppingCart;
  let shoppingCart: jasmine.SpyObj<ShoppingCart>;
  let product1 = { id: 1, productName: "Lego Star Wars toy", quantity: 1 }
  let product2 = { id: 4, productName: "Call of Duty PS5", quantity: 1 }
  let product3 = { id: 3, productName: "Pepsi", quantity: 1 }

  beforeEach(async () => {
    scheduler = new TestScheduler((received, expected) => {
      expect(received).toEqual(expected);
    });
    shoppingCart = TestBed.inject(ShoppingCart) as jasmine.SpyObj<ShoppingCart>;

    // shoppingCart = new ShoppingCart();
    // shoppingCart.addProduct(product1);
    // shoppingCart.addProduct(product1);
    // shoppingCart.addProduct(product2);
    // shoppingCart.addProduct(product3);
  });

  it('should remove products simple', () => {
    scheduler.run(({ cold, expectObservable }) => {

      spyOn(shoppingCart, 'removeProduct').and.returnValue(of(true));

      // const source = cold('--a--b--a--a--c--c--b--', { a: product1, b: product2, c: product3});
      // const x = cold('       a-----a--a-----------', { a: product1 });
      // const y = cold('          b--------------b--', { b: product2 });
      // const z = cold('                   c--c-----', { c: product3 });
      // const expect = '     --x--y--------z--------';
      const source = cold('--a--b--c--', { a: product1, b: product2, c: product3});
      // const x = cold('       a--------', { a: product1 });
      // const y = cold('          b-----', { b: product2 });
      // const z = cold('             c--', { c: product3 });
      // const x = product1;
      // const y = product2;
      // const z = product3;
      const expect = '     --x--y--z--';
    
      const result = source.pipe(removeProducts(shoppingCart));

      expectObservable(result).toBe(expect, { x: true, y: true, z: true });
    });
  });

  it('should remove products', () => {
    scheduler.run(({ cold, expectObservable }) => {

      spyOn(shoppingCart, 'removeProduct').and.returnValue(of(true));

      const source = cold('--a--b--a--a--c--c--b--', { a: product1, b: product2, c: product3});
      const expect = '     --x--y--x--x--z--z--y--';
    
      const result = source.pipe(removeProducts(shoppingCart));

      expectObservable(result).toBe(expect, { x: true, y: true, z: true });
    });
  });

  it('should remove products with delay', () => {
    scheduler.run(({ cold, expectObservable }) => {

      spyOn(shoppingCart, 'removeProduct').and.returnValue(of(true));

      const source = cold('--a--b--a--a--c--c--b--', { a: product1, b: product2, c: product3});
      const expect = '     --x--y--x--x--z--z--y--';
    
      const result = source.pipe(removeProducts(shoppingCart));

      expectObservable(result).toBe(expect, { x: true, y: true, z: true });
    });
  });
});