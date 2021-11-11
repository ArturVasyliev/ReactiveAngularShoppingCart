import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Product } from "../models/product";

@Injectable({
    providedIn: 'root'
})
export class ShoppingCart {
    
    private subject = new BehaviorSubject<Product[]>([]);
    products$: Observable<Product[]> = this.subject.asObservable();

    addProduct(newProduct: Product) : Observable<Product>{
        const newProducts = this.subject.getValue().slice(0);
        const productIndex = newProducts.findIndex(product => product.id === newProduct.id);

        if(productIndex === -1){
            newProducts.push(newProduct);
        }
        else{
            newProducts[productIndex] = 
            {
                ...newProducts[productIndex], 
                quantity: newProducts[productIndex].quantity + newProduct.quantity
            };
        }

        this.subject.next(newProducts);
        return productIndex === -1 ? of(newProduct) :  of(newProducts[productIndex]);
    }

    removeProduct(productToRemove: Product) : Observable<boolean>{
        const newProducts = this.subject.getValue().slice(0);
        const productIndex = newProducts.findIndex(product => product.id === productToRemove.id);

        if(productIndex !== -1){
            const product = newProducts[productIndex];

            if(productToRemove.quantity >= product.quantity){
                newProducts.splice(productIndex, 1);
            }
            else{
                newProducts[productIndex] = 
                {
                    ...newProducts[productIndex], 
                    quantity: newProducts[productIndex].quantity - productToRemove.quantity
                };
            }

            this.subject.next(newProducts);
            return of(true);
        }

        return of(false);
    }
}