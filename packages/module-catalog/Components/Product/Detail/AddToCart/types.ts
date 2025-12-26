import { ProductItemInterface } from '@voguish/module-catalog/types';

export interface AddToCartProps {
  product: ProductItemInterface;
  optionValue: {
    id: number;
    value_string: string;
  }[];
  sku?: string;
}
