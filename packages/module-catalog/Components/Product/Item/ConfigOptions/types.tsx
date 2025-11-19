import {
  ConfigurableVariant,
  ProductPrice,
} from '@voguish/module-catalog/types';
export type ConfigurableProductOption = {
  uid: string | number | null | undefined;
  attribute_code: string | number;
  label: string;
  values: [
    {
      uid: string | number;
      swatch_data: {
        __typename: string;
        value: string;
      };
      label: string;
    }
  ];
};

export type ConfigOptionsProps = {
  configurableOptions: ConfigurableProductOption[];
  detailsPage?: boolean;
  selectedOptions?: string[];
  setProductPrice?: (price: ProductPrice) => void;
  setProductSku?: (sku: string) => void;
  variants?: ConfigurableVariant[];
};

export type OptionRendererProps = {
  name: `selected_options.${number}`;
  index: number;
  option: ConfigurableProductOption;
  detailsPage?: boolean;
};
