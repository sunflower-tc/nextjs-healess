import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '@store/hooks';
import { isValidArray } from '@utils/Helper';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { useMemo } from 'react';
import { EditIcon } from '../../../../module-theme/components/elements/Icon';

export interface addressType {
  label: any;
  country?: { code?: string };
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
    label?: string;
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
  let temp = [];
  if (isValidArray(data)) {
    temp = data;
  }
  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
  const checkout = useAppSelector((state) => {
    return state?.checkout;
  });

  const defaultChecked: number | any = useMemo(() => {
    if (checkout?.selectedShippingAddress?.uid) {
      return checkout?.selectedShippingAddress?.uid;
    }
    let data_ = data?.find((address: any) => address.default_billing === true);
    return data_?.id;
  }, [data, checkout]);

  if (defaultChecked === -1 || checkout?.selectedShippingAddress?.uid === -1) {
    let addressData: any = {};
    addressData.__typename =
      checkout?.selectedShippingAddress?.__typename || 'CustomerAddress';
    addressData.id = checkout?.selectedShippingAddress?.uid;
    addressData.firstname = checkout?.selectedShippingAddress?.firstname;
    addressData.lastname = checkout?.selectedShippingAddress?.lastname;
    addressData.company = checkout?.selectedShippingAddress?.company;
    addressData.default_billing =
      checkout?.selectedShippingAddress?.default_billing || false;
    addressData.telephone = checkout?.selectedShippingAddress?.telephone;
    addressData.street = checkout?.selectedShippingAddress?.street;
    addressData.city = checkout?.selectedShippingAddress?.city;
    addressData.postcode = checkout?.selectedShippingAddress?.postcode;
    addressData.region = {
      __typename:
        checkout?.selectedShippingAddress?.region?.__typename ||
        'CustomerAddressRegion',
      region_id: checkout?.selectedShippingAddress?.region?.region_id,
      region:
        checkout?.selectedShippingAddress?.region?.label ||
        checkout?.selectedShippingAddress?.region?.label,
    };
    addressData.country_code =
      checkout?.selectedShippingAddress?.country_code ||
      checkout?.selectedShippingAddress?.country?.code;
    addressData.telephone = checkout?.selectedShippingAddress?.telephone;

    temp = [addressData, ...temp];
  }

  return (
    <ErrorBoundary>
      {loading ? (
        <div className="flex items-center justify-center py-10">
          <CircularProgress className="mx-auto text-brand/80" color="primary" />
        </div>
      ) : (
        <ErrorBoundary>
          <RadioGroup
            aria-label="options"
            name="address"
            onChange={handleRadioChange}
            defaultValue={defaultChecked}
          >
            <span className="-ml-1.5 grid grid-cols-12">
              {temp?.length > 0 &&
                temp
                  ?.filter(
                    (address: addressType) =>
                      address?.firstname && address?.lastname
                  )
                  ?.map((address: addressType, index: number) => {
                    return (
                      (index < 6 ||
                        address?.default_billing === true ||
                        address?.id === -1) && (
                        <Box
                          className="col-span-12 px-4 md:col-span-6 lg:col-span-6 xl:col-span-4"
                          key={index}
                        >
                          {address.default_billing === address.id}
                          <ErrorBoundary>
                            <Box className="relative my-2 ml-[8px] rounded-md border border-solid border-gray-200">
                              <div className="absolute left-[-29px] top-[-10px]">
                                <FormControlLabel
                                  value={address.id || 0}
                                  control={<Radio />}
                                  label=""
                                />
                              </div>
                              {address.id === -1 && (
                                <div className="absolute top-[1px] ltr:right-[3px] rtl:left-[3px]">
                                  <div>
                                    <IconButton
                                      aria-label="edit"
                                      onClick={() =>
                                        updateHandlerId(address.id)
                                      }
                                    >
                                      <EditIcon />
                                    </IconButton>
                                  </div>
                                </div>
                              )}
                              <div className="px-3 py-2 text-sm">
                                {address?.firstname && (
                                  <Typography variant="subtitle1">
                                    {address?.firstname +
                                      ' ' +
                                      address?.lastname}
                                  </Typography>
                                )}
                                {address?.company && (
                                  <Typography
                                    variant="body1"
                                    className="text-sm"
                                  >
                                    {address?.company}
                                  </Typography>
                                )}
                                {address?.telephone && (
                                  <Typography
                                    variant="body1"
                                    className="text-sm"
                                  >
                                    {address?.telephone}
                                  </Typography>
                                )}

                                {address?.city && (
                                  <Typography
                                    className="text-sm"
                                    variant="body1"
                                  >
                                    {address?.city + '-' + address?.postcode}
                                  </Typography>
                                )}

                                {address?.region.region && (
                                  <Typography
                                    className="text-sm"
                                    variant="body1"
                                  >
                                    {address?.region.region} ,
                                    {address?.country_code &&
                                      regionNames.of(address?.country_code)}
                                  </Typography>
                                )}

                                {address?.telephone && (
                                  <Typography
                                    className="text-sm"
                                    variant="body1"
                                  >
                                    {'Tx: ' + address?.telephone}
                                  </Typography>
                                )}
                              </div>
                            </Box>
                          </ErrorBoundary>
                        </Box>
                      )
                    );
                  })}
            </span>
          </RadioGroup>
        </ErrorBoundary>
      )}
    </ErrorBoundary>
  );
}
