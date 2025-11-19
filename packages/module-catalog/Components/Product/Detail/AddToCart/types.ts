import {
  ProductItemInterface,
  ProductPrice,
} from '@voguish/module-catalog/types';

export interface AddToCartProps {
  product: ProductItemInterface;
  setProductPrice: (price: ProductPrice) => void;
  setProductSku: (sku: string) => void;
}
