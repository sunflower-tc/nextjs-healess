import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { isValidArray, isValidObject } from '@utils/Helper';
import {
  AggregationInterface,
  AppliedLayerFilter,
  FilterEqualTypeInput,
  FilterRangeTypeInput,
  ProductAttributeFilterInput,
} from '@voguish/module-catalog';
import { encode as base64_encode } from 'base-64';
import dynamic from 'next/dynamic';
import { ChangeEvent, useState } from 'react';
const CheckBox = dynamic(() => import('@mui/icons-material/CheckBox'));
const CheckBoxOutlineBlankRounded = dynamic(
  () => import('@mui/icons-material/CheckBoxOutlineBlankRounded')
);
const FilterRenderer = ({
  filter,
  expandedView = false,
  manageFilterAction,
  appliedFilters = [],
}: {
  appliedFilters: AppliedLayerFilter[] | undefined;
  filter: AggregationInterface;
  expandedView?: boolean;
  manageFilterAction: (
    payload: // eslint-disable-line
      ProductAttributeFilterInput
  ) => void;
}) => {
  /**
   * To manage toggle of Filter renderer
   */
  const [open, setOpen] = useState(expandedView);

  /**
   * Handle Filter Action
   *
   * @param event
   * @param value
   */
  const handleFilter = (
    event: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    const filterName = event.target.name;
    let filterValue: FilterRangeTypeInput | FilterEqualTypeInput = {
      eq: value,
    };
    if (filterName === 'price') {
      const priceRange = value.split('_');
      filterValue = { from: priceRange[0], to: priceRange[1] };
    }
    if (filterName === 'category_uid') {
      filterValue = { eq: base64_encode(value) };
    }

    manageFilterAction({ [event.target.name]: filterValue });
  };

  /**
   * Handling Toggle of filter
   */
  const handleClick = () => {
    setOpen(!open);
  };

  /**
   * To show selected filter in Layered Navigation
   */
  const isSelectedFilter = (attributeCode: string, value: string): boolean => {
    let selected = false;

    if (attributeCode === 'price' && value.includes('_')) {
      value = value.replace('_', '-');
    }
    if (isValidArray(appliedFilters)) {

      const searchSelected = appliedFilters.find(
        (appliedFilter) =>
          appliedFilter.attribute_code === attributeCode &&
          appliedFilter.value === value
      );

      if (isValidObject(searchSelected)) {
        selected = true;
      }
    }
    return selected;
  };
  return (
    <List
      className={`border-solid border -lg:px-4 border-commonBorder  ${!open ? '-lg:border-b -lg:border-0' : '-lg:border-y -lg:border-0'
        }`}
      subheader={
        <ListSubheader
          onClick={handleClick}
          component="div"
          id="nested-list-subheader"
          sx={{
            fontWeight: 400,
            fontSize: '1rem',
            color: 'common.black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',

            borderBottom: `${open ? '1px solid' : ''}`,
            borderColor: 'themeAdditional.borderColor',
          }}
          className={`leading-normal cursor-pointer ${open ? 'py-3' : 'pt-3 pb-1'
            } lg:leading-[1.55rem]`}
        >
          {filter?.label}
          {!open ? (
            <ArrowDropDownIcon className="mt-1" />
          ) : (
            <ArrowDropUpIcon className="mt-1 text-brand" />
          )}
        </ListSubheader>
      }
    >
      <Collapse in={open} timeout="auto">
        <Box component="form" className="w-full">
          <RadioGroup name={filter.attribute_code} onChange={handleFilter}>
            <List>
              {isValidArray(filter.options) &&
                filter.options.map((option) => (
                  <ListItem key={option.value} disablePadding>
                    <ListItemButton
                      className="flex items-center w-full pb-0"
                      dense
                    >
                      <FormControlLabel
                        className="flex items-center w-full h-full"
                        control={
                          <Radio
                            className="hover:bg-transparent"
                            checkedIcon={<CheckBox />}
                            checked={isSelectedFilter(
                              filter.attribute_code,
                              filter.attribute_code === 'category_uid' ? base64_encode(option.value) : option.value
                            )}
                            icon={<CheckBoxOutlineBlankRounded />}
                            value={option.value}
                          />
                        }
                        label={
                          <ListItemText
                            className="w-full  pt-[0.275rem] leading-normal lg:leading-[2.15rem]"
                            id={`${filter.attribute_code}_${option.value}`}
                          >
                            <span
                              dangerouslySetInnerHTML={{ __html: option.label }}
                            />
                          </ListItemText>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
            </List>
          </RadioGroup>
        </Box>
      </Collapse>
    </List>
  );
};

export default FilterRenderer;
