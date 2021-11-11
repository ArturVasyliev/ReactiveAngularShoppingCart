import { Component, OnInit } from '@angular/core';
import { Observable, of, pipe, Subject } from 'rxjs';
import { delay, exhaustMap, groupBy, map, mergeMap } from 'rxjs/operators';
import { ShoppingCart } from '../common/shoppingCart.service';
import { Product } from '../models/product';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  removeStream$ = new Subject<Product>();

  products$!: Observable<Product[]>;

  constructor(private shoppingCart: ShoppingCart) { }

  ngOnInit(): void {
    this.products$ = this.shoppingCart.products$;

    this.removeStream$.pipe(removeProducts(this.shoppingCart))
      .subscribe(); // don't know how to implement this without subscribing

  }

  removeProduct(product: Product){
    this.removeStream$.next(product);
  }

}

export function removeProducts(shoppingCart: ShoppingCart){

  // should I divide it into more functions?
  return pipe(
    groupBy<Product, number>(product => product.id),
    mergeMap(group$ => group$.pipe(
      exhaustMap(product => shoppingCart.removeProduct(product)
        .pipe(
          delay(500)
        )
      )
    ))
  );
}