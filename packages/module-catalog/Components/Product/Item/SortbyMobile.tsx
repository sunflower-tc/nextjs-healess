import Clear from '@mui/icons-material/Clear';
import { SelectChangeEvent } from '@mui/material';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { isValidArray } from '@utils/Helper';
import {
  SortFields,
  SortModal,
  ToolbarActionType,
} from '@voguish/module-catalog';
import { Fragment } from 'react';

export const createSortFields = (sortOptions: SortFields) => {
  let options: { value: string; label: string }[] = [];
  sortOptions.options.forEach((option) => {
    options = [
      ...options,
      {
        value: `${option.value}||ASC`,
        label: `${option.label} ${
          option.value === 'name' ? 'A to Z' : 'Low to High'
        }`,
      },
      {
        value: `${option.value}||DESC`,
        label: `${option.label} ${
          option.value === 'name' ? 'Z to A' : 'High to Low'
        }`,
      },
    ];
  });
  return options;
};

/**
 * Toolbar
 * @param props
 * @returns
 */
const SortbyMobile = (props: SortModal) => {
  const { open, sortHandler, sortFields, sort, manageToolbarAction } = props;
  /**
   * Handle Toolbar Actions
   * @param event
   */
  const handleChange = (event: SelectChangeEvent) => {
    // setSortOption(event.target.value as string);
    manageToolbarAction({
      action: ToolbarActionType.SORT,
      payload: event.target.value as string,
    });
  };

  let sortFieldsWithValues = null;

  if (sortFields && typeof sortFields !== 'undefined') {
    sortFieldsWithValues = createSortFields(sortFields);
  }
  return (
    <Fragment>
      {sortFieldsWithValues && isValidArray(sortFieldsWithValues) ? (
        <Modal
          className="lg:hidden"
          open={open}
          onClose={sortHandler}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: 50,
                width: '100%',
                minHeight: 400,
              }}
            >
              <Box
                sx={{
                  margin: 'auto',
                  width: '90%',
                  maxHeight: '100%',
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                }}
              >
                <Box className="flex items-center justify-between w-full p-5">
                  <Typography variant="h2">Sort By</Typography>
                  <Button
                    sx={{ paddingX: 0, minWidth: 0 }}
                    onClick={sortHandler}
                    className="w-10 h-10 px-0 mx-1 mt-1 rounded-full"
                  >
                    <Clear />
                  </Button>
                </Box>
                <Box className="px-5 pb-5">
                  <FormControl fullWidth>
                    <RadioGroup
                      onClick={sortHandler}
                      aria-labelledby="product-list-sort-field-label"
                      onChange={handleChange}
                      value={sort}
                    >
                      {sortFieldsWithValues.map((option) => (
                        <FormControlLabel
                          key={option.value}
                          value={option.value}
                          control={<Radio size="small" />}
                          label={option.label}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Box>
            </Box>
          </>
        </Modal>
      ) : (
        <></>
      )}
    </Fragment>
  );
};
export default SortbyMobile;
