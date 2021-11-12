import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "../models/product";

@Injectable({
    providedIn: 'root' // removing 'providedIn' disables singleton logic
})
export class ShoppingCartService {
    
    private subject = new BehaviorSubject<Product[]>([]);
    products$: Observable<Product[]> = this.subject.asObservable();

    addProduct(newProduct: Product) : void {
        let newProducts = [...this.subject.getValue()];
        const productIndex = newProducts.findIndex(product => product.id === newProduct.id);

        if(productIndex === -1){
            newProducts = [...newProducts, newProduct];
        }
        else{
            newProducts = [...newProducts];
            newProducts[productIndex] = 
            {
                ...newProducts[productIndex], 
                quantity: newProducts[productIndex].quantity + newProduct.quantity
            };
        }

        this.subject.next(newProducts);
    }

    removeProduct(productToRemove: Product) : void {
        const newProducts = [...this.subject.getValue()];
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
        }
    }
}