import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ImpactIndex from '../Components/ImpactIndex.jsx';
import CoreMetrics from '../Components/CoreMetrics.jsx';
import PersonalWellbeing from '../Components/PersonalWellbeing.jsx';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E5EAFB' }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function MainLayout() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', backgroundColor: 'transparent' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'transparent'  }} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Impact Index" {...a11yProps(0)} />
          <Tab label="Core Metrics" {...a11yProps(1)} />
          <Tab label="Personal Wellbeing" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ImpactIndex />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <CoreMetrics />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <PersonalWellbeing />
      </CustomTabPanel>
    </Box>
  );
}

export default MainLayout;
