import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import React from 'react';
import { EditIcon } from '../../../../module-theme/components/elements/Icon';

export interface addressType {
  id?: number | string | any;
  default_billing?: boolean;
  firstname?: string;
  lastname?: string;
  address?: string | null;
  company?: string | null;
  telephone?: string | null;
  company_name?: string;
  street?: [] | string | any;
  city?: string | null;
  postcode?: number | string;
  region: {
    region_id?: number | string;
    region?: string;
  };
  country_code?: string | any;
}
export default function AddressList({
  handleRadioChange,
  data,
  loading,
  updateHandlerId,
}: {
  handleRadioChange: any;
  loading: boolean;
  data: any;
  updateHandlerId(id: number): void;
}) {
  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

  const defaultChecked: number | any = React.useMemo(() => {
    let data_ = data?.customer?.addresses?.find(
      (address: any) => address.default_billing === true
    );
    return data_?.id;
  }, [data]);
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center py-10">
          <CircularProgress className="mx-auto text-brand/80" color="primary" />
        </div>
      ) : (
        <>
          <RadioGroup
            aria-label="options"
            name="address"
            onChange={handleRadioChange}
            defaultValue={defaultChecked}
          >
            <span className="grid -ml-1.5 grid-cols-12 ">
              {data?.customer?.addresses.length > 0 &&
                data?.customer?.addresses.map(
                  (address: addressType, index: number) =>
                    index < 6 && (
                      <Box
                        className="col-span-12 px-4 xl:col-span-4 lg:col-span-6 md:col-span-6"
                        key={index}
                      >
                        {address.default_billing === address.id}
                        <React.Fragment>
                          <Box className="relative my-2 border border-solid border-gray-200 rounded-md ml-[8px] ">
                            <div className="absolute top-[-10px] left-[-29px]">
                              <FormControlLabel
                                value={address.id}
                                control={<Radio />}
                                label=""
                              />
                            </div>
                            <div className="absolute top-[1px] right-[3px]">
                              <div>
                                <IconButton
                                  aria-label="edit"
                                  onClick={() => updateHandlerId(address.id)}
                                >
                                  <EditIcon />
                                </IconButton>
                              </div>
                            </div>
                            <div className="px-3 py-2 text-sm">
                              <Typography variant="subtitle1">
                                {address?.firstname + ' ' + address?.lastname}
                              </Typography>
                              <Typography variant="body1" className="text-sm ">
                                {address?.company}
                              </Typography>
                              <Typography variant="body1" className="text-sm">
                                {address?.telephone}
                              </Typography>

                              {address.street.map(
                                (
                                  customerStreet: string,
                                  streetIndex: number
                                ) => (
                                  <span className="text-sm" key={streetIndex}>
                                    {customerStreet} {' , '}
                                  </span>
                                )
                              )}
                              <Typography className="text-sm " variant="body1">
                                {address?.city + '-' + address?.postcode}
                              </Typography>

                              <Typography className="text-sm" variant="body1">
                                {address?.region.region} ,
                                {regionNames.of(address?.country_code)}
                              </Typography>
                              <Typography className="text-sm" variant="body1">
                                {'Tx: ' + address?.telephone}
                              </Typography>
                            </div>
                          </Box>
                        </React.Fragment>
                      </Box>
                    )
                )}
            </span>
          </RadioGroup>
        </>
      )}
    </>
  );
}
