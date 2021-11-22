import { Injectable } from '@angular/core';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { Subject } from 'rxjs/internal/Subject';
import { ICart } from '../../components/shopping-cart/shopping-cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  products: Array<IProduct> = [];
  cart: ICart = {
    total: 0,
    subtotal: 0,
    products: this.products,
  };

  public itemsVar = new Subject<ICart>();
  public itemsVar$ = this.itemsVar.asObservable();

  constructor() {}

  initialize() {
    const storeData = JSON.parse(localStorage.getItem('cart') || 'null');

    if (storeData) {
      this.cart = storeData;
    }
    return this.cart;
  }

  orderDescription() {
    let description = '';

    this.cart.products.map((product: any) => {
      description += `${product.name} (${product.description}) x ${product.qty}\n`;
    });

    return description;
  }

  public updateItemsInCart(newValue: ICart) {
    this.itemsVar.next(newValue);
  }

  manageProduct(product: IProduct) {
    const productTotal = this.cart.products.length;

    if (productTotal === 0) {
      this.cart.products.push(product);
    } else {
      let actionUpdateOk = false;
      for (let i = 0; i < productTotal; i++) {
        if (product.id === this.cart.products[i].id) {
          if (product.qty === 0) {
            this.cart.products.splice(i, 1);
          } else {
            // Actualizar
            this.cart.products[i] = product;
          }
          actionUpdateOk = true;
          i = productTotal;
        }
      }

      if (!actionUpdateOk) {
        this.cart.products.push(product);
      }
    }
    this.checkOutTotal();
  }

  checkOutTotal() {
    let subtotal = 0;
    let total = 0;

    this.cart.products.map((product: IProduct) => {
      subtotal += product.qty!;
      total += product.qty! * product.price;
    });

    this.cart.total = +(Math.round(total * 100) / 100).toFixed(2);
    this.cart.subtotal = subtotal;
    this.setInformation();
  }

  clear() {
    this.products = [];
    this.cart = {
      total: 0,
      subtotal: 0,
      products: this.products,
    };
    this.setInformation();
    return this.cart;
  }

  private setInformation() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateItemsInCart(this.cart);
  }

  open() {
    document.getElementById('mySidenav')!.style.width = '600px';
    document.getElementById('overlay')!.style.display = 'block';
    document.getElementById('app')!.style.overflow = 'hidden';
  }

  close() {
    document.getElementById('mySidenav')!.style.width = '0';
    document.getElementById('overlay')!.style.display = 'none';
    document.getElementById('app')!.style.overflow = 'auto';
  }
}
