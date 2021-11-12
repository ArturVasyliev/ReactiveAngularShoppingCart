import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCartService } from '../common/shoppingCart.service';
import { Product } from '../models/product';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  // The specification below creates an instance of ShoppingCartService for the current component
  // providers: [ShoppingCartService]
})
export class ShoppingCartComponent implements OnInit {

  products$!: Observable<Product[]>;

  constructor(private shoppingCart: ShoppingCartService) { }

  ngOnInit(): void {
    this.products$ = this.shoppingCart.products$;
  }

  removeProduct(product: Product){
    const productToRemove = {...product, quantity: 1 };
    this.shoppingCart.removeProduct(productToRemove);
  }

}