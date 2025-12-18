import { ConfigurableVariant } from '@voguish/module-catalog/types';
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
    },
  ];
};

export type ConfigOptionsProps = {
  compare?: boolean;
  configurableOptions: ConfigurableProductOption[];
  detailsPage?: boolean;
  selectedOptions?: string[];
  variants?: ConfigurableVariant[];
};

export type OptionRendererProps = {
  compare?: boolean;
  name: `selected_options.${number}`;
  index: number;
  option: ConfigurableProductOption;
  detailsPage?: boolean;
};
