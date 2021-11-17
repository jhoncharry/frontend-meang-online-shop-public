import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';

export interface ICart {
  total: number;
  subtotal: number;
  products: Array<IProduct>;
}
