import { Component, OnInit } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { Product } from '../models/product';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products$!: Observable<Product[]>;

  constructor() {}

  ngOnInit(): void {
    this.products$ = of([
      { id: 1, productName: "Lego Star Wars toy", quantity: 1 },
      { id: 2, productName: "MacBook Air M1", quantity: 1 },
      { id: 3, productName: "Pepsi", quantity: 1 },
      { id: 4, productName: "Call of Duty PS5", quantity: 1 },
      { id: 5, productName: "Spider-Man: No Way Home ticket", quantity: 1 }
    ]);
  }

}
