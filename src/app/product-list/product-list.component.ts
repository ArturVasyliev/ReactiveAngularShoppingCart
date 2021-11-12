import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ShoppingCartService } from '../common/shoppingCart.service';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  // The specification below creates an instance of ShoppingCartService for the current component
  // providers: [ShoppingCartService]
})
export class ProductListComponent implements OnInit {

  products$!: Observable<Product[]>;

  constructor(private shoppingCart: ShoppingCartService) {}
  
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

  addProduct(product: Product){
    this.shoppingCart.addProduct(product);
  }

}