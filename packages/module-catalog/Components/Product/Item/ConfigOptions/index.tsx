import { useAppDispatch } from '@store/hooks';
import { setConfigProduct } from '@store/store';
import { isValidArray } from '@utils/Helper';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { useCallback, useEffect } from 'react';
import ColorSwatchOption from './ColorSwatchOption';
import DropDownOption from './DropDownOption';
import TextSwatchOption from './TextSwatchOption';
import { ConfigOptionsProps } from './types';
export const ConfigOptions = ({
  configurableOptions,
  selectedOptions,
  variants,
  compare = false,
  detailsPage = false,
}: ConfigOptionsProps) => {
  const dispatch = useAppDispatch();
  const findSelectedProduct = useCallback(() => {
    if (isValidArray(selectedOptions) && isValidArray(variants)) {
      const selectedVariant = variants?.find((variant) =>
        variant?.attributes?.every((attribute) =>
          selectedOptions?.includes(attribute.uid)
        )
      );
      if (selectedVariant && selectedVariant.product) {
        dispatch(setConfigProduct(selectedVariant));
      }
    }
  }, [dispatch, selectedOptions, variants]);
  useEffect(() => {
    findSelectedProduct();
  });
  const configOptions = configurableOptions?.map((option) => {
    return {
      ...option,
      swatchType:
        option?.values?.at(0)?.swatch_data?.__typename || 'DropdownData',
    };
  });

  return (
    <ErrorBoundary>
      <div
        className={`flex flex-col max-w-fit mb-0 ${detailsPage ? '' : 'mt-0 '}`}
      >
        <div className={`flex flex-col-reverse ${detailsPage && 'gap-y-1'}`}>
          {configOptions.map((option, index) => (
            <div className="flex items-center" key={option.uid}>
              <div className="flex flex-col">
                <ErrorBoundary>
                  {detailsPage && option.swatchType === 'TextSwatchData' && (
                    <div className="pt-5">
                      <ErrorBoundary>
                        <TextSwatchOption
                          compare={compare}
                          index={index}
                          name={`selected_options.${index}`}
                          option={option}
                        />
                      </ErrorBoundary>
                    </div>
                  )}
                </ErrorBoundary>
                <ErrorBoundary>
                  {compare && option?.swatchType === 'TextSwatchData' && (
                    <div className="pb-5">
                      <ErrorBoundary>
                        <TextSwatchOption
                          compare={compare}
                          index={index}
                          name={`selected_options.${index}`}
                          option={option}
                        />
                      </ErrorBoundary>
                    </div>
                  )}
                </ErrorBoundary>
                <ErrorBoundary>
                  {option?.swatchType === 'ColorSwatchData' && (
                    <div className={`${detailsPage && 'pt-5'}`}>
                      <ErrorBoundary>
                        {' '}
                        <ColorSwatchOption
                          compare={compare}
                          detailsPage={detailsPage}
                          index={index}
                          name={`selected_options.${index}`}
                          option={option}
                        />
                      </ErrorBoundary>
                    </div>
                  )}
                </ErrorBoundary>
              </div>
            </div>
          ))}
        </div>

        <ErrorBoundary>
          {detailsPage &&
            configOptions?.map(
              (option, index) =>
                detailsPage &&
                option.swatchType === 'DropdownData' && (
                  <div className="flex items-center pt-9" key={option.uid}>
                    <div className="gap-x-2">
                      {/* DropdownData */}
                      {detailsPage && option?.swatchType === 'DropdownData' && (
                        <ErrorBoundary>
                          <DropDownOption
                            compare={compare}
                            index={index}
                            name={`selected_options.${index}`}
                            option={option}
                          />
                        </ErrorBoundary>
                      )}
                    </div>
                  </div>
                )
            )}
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
};

export default ConfigOptions;
