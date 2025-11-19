import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { TabsProp } from '@voguish/module-catalog/types';
import { ReactNode, SyntheticEvent, useState } from 'react';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
  right?: boolean;
}

function TabPanel(props: TabPanelProps) {
  const { right, children, value, index, ...other } = props;

  return (
    <div
      className={` ${right ? 'px-1.5 py-3' : 'px-0 py-0 my-0'}`}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={`${!right && 'py-0'} px-0 mx-0`}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabLayout({
  items,
  right = true,
}: {
  items: TabsProp[];
  right?: boolean;
}) {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }} className={`${right ? '' : 'py-0 my-0'}`}>
      <Box
        className={` mx-2 ${
          right ? '' : 'flex justify-center mx-auto max-w-[90rem] px-0 sm:px-6'
        }`}
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {items.map((item) => (
            <Tab
              className={`my-0 ${
                value === item.id - 1 ? 'font-semibold' : 'font-normal'
              }`}
              aria-label={item.name}
              key={item.id}
              label={item.name}
              {...a11yProps(item.id - 1)}
            />
          ))}
        </Tabs>
      </Box>
      {items.map((item) => (
        <TabPanel right={right} value={value} index={item.id - 1} key={item.id}>
          {item.render()}
        </TabPanel>
      ))}
    </Box>
  );
}
