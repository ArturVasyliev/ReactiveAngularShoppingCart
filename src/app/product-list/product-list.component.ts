import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { from, fromEvent, Observable, of, pipe } from 'rxjs';
import { ShoppingCart } from '../common/shoppingCart.service';
import { Product } from '../models/product';
import { delay, exhaustMap, filter, find, flatMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit {

  @ViewChildren('addBtn')
  addButtons!:QueryList<any>;

  products$!: Observable<Product[]>;

  constructor(private shoppingCart: ShoppingCart) {}
  
  ngOnInit(): void {
    this.products$ = of<Product[]>([
      { id: 1, productName: "Lego Star Wars toy", quantity: 1 },
      { id: 2, productName: "MacBook Air M1", quantity: 1 },
      { id: 3, productName: "Pepsi", quantity: 1 },
      { id: 4, productName: "Call of Duty PS5", quantity: 1 },
      { id: 5, productName: "Spider-Man: No Way Home ticket", quantity: 1 }
    ])
    .pipe(
      map(products => products.filter(product => product.quantity > 0))
    );
  }

  ngAfterViewInit(): void {
    this.addButtons.forEach(button => {
      fromEvent(button.nativeElement, 'click')
        .pipe(addProductToCart(this.products$, this.shoppingCart))
        .subscribe(); // don't know how to implement this without subscribing
    });
  }

}

export function addProductToCart(products: Observable<Product[]>, shoppingCart: ShoppingCart){
  return pipe(
    map<any, any>(event => event.target.getAttribute('productId')),
    switchMap<any, Observable<Product>>(productId => products
      .pipe(
        map<Product[], Product>(products => products.find(product => product.id === Number(productId)) as Product)
      )
    ),
    exhaustMap<Product, Observable<any>>(product => shoppingCart.addProduct(product)
      .pipe(
        delay(300) // checking that we restrict number of clicks on add button
      )
    )
  )
}