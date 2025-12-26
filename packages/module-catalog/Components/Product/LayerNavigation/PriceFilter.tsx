import { useRouter } from 'next/router';
import { getCategoryFilterQuery, getFormattedPrice } from '@utils/Helper';
import { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';

export default function PriceFilter({ filter }: { filter: any }) {
  const router = useRouter();

  const maxPriceValue = Math.max(
    ...filter?.options.map((item: { value: string }) =>
      parseInt(item.value.split('_')[1], 10)
    )
  );
  const minPriceValue = Math.min(
    ...filter?.options.map((item: { value: string }) =>
      parseInt(item.value.split('_')[1], 10)
    )
  );
  const minDistance = filter?.options?.length * 100;
  const {
    query: { urlKey: queries = [] },
  } = router;

  const [priceRange, setPriceRange] = useState<number[]>([
    minPriceValue,
    maxPriceValue,
  ]);
  useEffect(() => {
    if (!router?.asPath?.includes('price')) {
      setPriceRange([minPriceValue, maxPriceValue]);
      setValue2([minPriceValue, maxPriceValue]);
    } else {
      const priceIndex = router?.asPath?.split('/')?.indexOf('price');
      const priceValue = router?.asPath?.split('/')?.[priceIndex + 1];
      const [min, max] = priceValue?.split('_');
      setPriceRange([parseInt(min), parseInt(max)]);
      setValue2([parseInt(min), parseInt(max)]);
    }
  }, [router?.asPath]);

  const maxV = priceRange[1];
  const minV = priceRange[0];
  const max = parseInt(`${maxV?.toFixed(0)}`);
  const min = parseInt(`${minV?.toFixed(0)}`);

  const [value2, setValue2] = useState<number[]>([min, max]);

  const priceRangeHandler = (
    event: Event | React.SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => {
    if (Array.isArray(value)) {
      setPriceRange([value[0], value[1]]);
      setValue2([value[0], value[1]]);
      const priceRouteValue = getCategoryFilterQuery(
        router,
        'price',
        `${Math.min(...value)}_${Math.max(...value)}`
      );
      router.push(priceRouteValue);
    }
  };

  const handleSliderChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    const [min, max] = newValue;
    if (max - min < minDistance) {
      if (activeThumb === 0) {
        setPriceRange([min, max]);
        setValue2([min, max]);
      } else {
        setPriceRange([min, max]);
        setValue2([min, max]);
      }
    } else {
      setValue2([min, max]);
    }
  };

  return (
    <ErrorBoundary>
      <div className="px-4 my-1">
        <div className="flex justify-between item">
          <span className="text-base font-semibold text-gray-800 capitalize">
            {filter?.label}
          </span>
        </div>
        <div className="px-1">
          <Slider
            getAriaLabel={() => 'Minimum distance shift'}
            value={value2}
            onChangeCommitted={priceRangeHandler}
            onChange={handleSliderChange}
            max={maxPriceValue}
            min={minPriceValue}
            valueLabelDisplay="auto"
            valueLabelFormat={(value: number) => getFormattedPrice(value ?? 0)}
            sx={{
              '& .MuiSlider-rail': {
                color: '#90969A',
                opacity: 1,
                height: 5,
              },
              zIndex: 2,
            }}
          />
        </div>
        <div className="flex justify-between item">
          <div className="text-xs text-gray-500">
            {getFormattedPrice(minPriceValue)}{' '}
          </div>
          <div className="text-xs text-gray-500">
            {getFormattedPrice(maxPriceValue)}{' '}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
