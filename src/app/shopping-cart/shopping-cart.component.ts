import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ShoppingCart } from '../common/shoppingCart.service';
import { Product } from '../models/product';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  products$!: Observable<Product[]>;

  constructor(private shoppingCart: ShoppingCart) { }

  ngOnInit(): void {
    this.products$ = this.shoppingCart.products$;
  }

  removeProduct(product: Product){
    this.shoppingCart.removeProduct(product);
  }

}
