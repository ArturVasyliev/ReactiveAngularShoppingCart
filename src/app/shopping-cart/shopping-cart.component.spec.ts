import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingCartComponent } from './shopping-cart.component';
import { ShoppingCartService } from '../common/shoppingCart.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

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
      providers: [ { provide: ShoppingCartService, useValue: shoppingCartFake } ],
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

});