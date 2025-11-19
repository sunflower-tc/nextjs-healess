import { t } from '@lingui/macro';
import { isValidArray } from '@utils/Helper';
import { useCallback, useEffect } from 'react';
import ColorSwatchOption from './ColorSwatchOption';
import DropDownOption from './DropDownOption';
import TextSwatchOption from './TextSwatchOption';
import { ConfigOptionsProps } from './types';

export const ConfigOptions = ({
  configurableOptions,
  setProductPrice,
  setProductSku,
  selectedOptions,
  variants,
  detailsPage = false,
}: ConfigOptionsProps) => {
  const findSelectedProduct = useCallback(() => {
    if (isValidArray(selectedOptions) && isValidArray(variants)) {
      const selectedVariant = variants?.find((variant) =>
        variant.attributes.every((attribute) =>
          selectedOptions?.includes(attribute.uid)
        )
      );
      if (
        selectedVariant &&
        selectedVariant.product &&
        setProductPrice &&
        setProductSku
      ) {
        setProductPrice(selectedVariant.product.price_range.minimum_price);
        setProductSku(selectedVariant.product.sku);
      }
    }
  }, [selectedOptions, setProductPrice, setProductSku, variants]);

  useEffect(() => {
    findSelectedProduct();
  });
  const configOptions = configurableOptions.map((option) => {
    return {
      ...option,
      swatchType: option.values[0].swatch_data?.__typename || t`DropdownData`,
    };
  });
  return (
    <div
      className={`flex flex-col max-w-fit mb-0 ${detailsPage ? '' : 'mt-0 '}`}
    >
      <div className={`flex flex-col-reverse ${detailsPage && 'gap-y-1'}`}>
        {configOptions.map((option, index) => (
          <div className="flex items-center" key={option.uid}>
            <div className="flex flex-col">
              {detailsPage && option.swatchType === 'TextSwatchData' && (
                <div className="pt-5">
                  <TextSwatchOption
                    index={index}
                    name={`selected_options.${index}`}
                    option={option}
                  />
                </div>
              )}
              {option.swatchType === 'ColorSwatchData' && (
                <div className={`${detailsPage && 'pt-5'}`}>
                  <ColorSwatchOption
                    detailsPage={detailsPage}
                    index={index}
                    name={`selected_options.${index}`}
                    option={option}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div>
        {detailsPage &&
          configOptions.map(
            (option, index) =>
              detailsPage &&
              option.swatchType === 'DropdownData' && (
                <div className="flex items-center pt-9" key={option.uid}>
                  <div className="gap-x-2">
                    {/* DropdownData */}
                    {detailsPage && option.swatchType === 'DropdownData' && (
                      <DropDownOption
                        index={index}
                        name={`selected_options.${index}`}
                        option={option}
                      />
                    )}
                  </div>
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default ConfigOptions;
