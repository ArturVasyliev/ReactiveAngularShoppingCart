import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { delay, exhaustMap, groupBy, mergeMap } from 'rxjs/operators';
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

    this.removeStream$
      .pipe(
        groupBy(product => product.id),
        mergeMap(group$ => group$.pipe(
          exhaustMap(product => this.shoppingCart.removeProduct(product)
            .pipe(
              delay(500)
            )
          )
        ))
      ).subscribe(); // don't know how to implement this without subscribing

  }

  removeProduct(product: Product){
    this.removeStream$.next(product);
  }

}
