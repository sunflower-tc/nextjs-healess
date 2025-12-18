// for mobile view

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Grow from '@mui/material/Grow';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { isValidArray } from '@utils/Helper';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import dynamic from 'next/dynamic';
import { ReactNode, SyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '../../Link';
const ArrowBack = dynamic(() => import('@mui/icons-material/ArrowBack'));
const ArrowForwardIos = dynamic(
  () => import('@mui/icons-material/ArrowForwardIos')
);
interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className="py-4"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Grid>{children}</Grid>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function NestedDrawers({ item }: [] | any) {
  const [value, setValue] = useState(0);
  const [index, setIndex] = useState(0);
  const [checked, setChecked] = useState(false);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setChecked(true);
  };
  const { t } = useTranslation('common');

  return (
    <ErrorBoundary>
      <Box className="px-4 CustomMenu" sx={{ width: '100%' }}>
        <Box>
          {index <= 0 && (
            <ErrorBoundary>
              <span className="cursor-pointer cta">
                <Typography className="hover-underline-animation">
                  {t('Home')}
                </Typography>
              </span>
              {isValidArray(item?.children) &&
                item?.children.map(
                  (item: any, index: any) =>
                    item?.children.length < 1 && (
                      <span key={index} className="cursor-pointer cta">
                        <Typography className="pt-7 hover-underline-animation">
                          <Link
                            underline="none"
                            href={`/catalog/category/${item.url_key}`}
                          >
                            {item.name}
                          </Link>
                        </Typography>
                      </span>
                    )
                )}
              <ErrorBoundary>
                <Tabs
                  className="mt-4"
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  {isValidArray(item?.children) &&
                    item?.children.map(
                      (item: any, index: any) =>
                        item?.children.length > 0 && (
                          <Tab
                            key={index}
                            className="cta"
                            sx={{ minWidth: '100%', maxWidth: '100%' }}
                            onClick={() => setIndex(1)}
                            label={
                              <span className="flex items-center justify-between w-full hover-underline-animation">
                                <Typography>
                                  <Link
                                    underline="none"
                                    href={`/catalog/category/${item.url_key}`}
                                  >
                                    {item.name}
                                  </Link>
                                </Typography>
                                <ArrowForwardIos className="-mr-5 text-sm cursor-pointer" />
                              </span>
                            }
                            {...a11yProps(index)}
                          />
                        )
                    )}
                </Tabs>
              </ErrorBoundary>
            </ErrorBoundary>
          )}
        </Box>
        {index > 0 && (
          <ErrorBoundary>
            {isValidArray(item?.children) &&
              item?.children.map(
                (item: any, index: any) =>
                  item?.children.length > 0 && (
                    <TabPanel key={index} value={value} index={index - 1}>
                      <span className="flex cursor-pointer items-center absolute -top-[3.25rem]">
                        <ArrowBack
                          className="relative text-xl font-bold -left-3"
                          onClick={() => setIndex(0)}
                        />
                        <Typography className="py-4 pl-1 text-xl font-bold">
                          <Link
                            underline="none"
                            href={`/catalog/category/${item.url_key}`}
                          >
                            {item.name}
                          </Link>
                        </Typography>
                      </span>
                      {item?.children.map((item: any, index: any) => (
                        <span key={index} className="cta">
                          <Grow
                            in={checked}
                            style={{ transformOrigin: '0 0 0' }}
                            {...(checked ? { timeout: 1000 } : {})}
                          >
                            <Typography
                              sx={{ transformOrigin: '0 0 0' }}
                              className="py-3 pl-6 duration-700 cursor-pointer hover-underline-animation"
                            >
                              <Link
                                underline="none"
                                href={`/catalog/category/${item.url_key}`}
                              >
                                {item.name}
                              </Link>
                            </Typography>
                          </Grow>
                        </span>
                      ))}
                    </TabPanel>
                  )
              )}
          </ErrorBoundary>
        )}
      </Box>
    </ErrorBoundary>
  );
}
