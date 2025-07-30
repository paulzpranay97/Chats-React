import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ImpactIndex from '../Components/ImpactIndex.jsx';
import CoreMetrics from '../Components/CoreMetrics.jsx';
import PersonalWellbeing from '../Components/PersonalWellbeing.jsx';
import CommunityWellbeing from '../Components/CommunityWellbeing.jsx';
import SpiritualWellbeing from '../Components/SpiritualWellbeing.jsx';


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
    <Box sx={{ width: '100%', backgroundColor: '#F6F6F6' }}>
      <Box sx={{ height:100, width:'100%', borderBottom: 1, borderColor: 'divider', backgroundColor: '#F6F6F6'  }} display={'flex'} justifyContent={'center'} alignItems={'center'} >
        <Tabs
  centered
  sx={{
    width: '100%',
   
    '.MuiTabs-indicator': {
      display: 'none', 
    },
    '.MuiTabs-flexContainer': {
      gap: '0px', 
      display: 'flex',
      justifyContent: 'center', 
      backgroundColor: '#F6F6F6',
     
      
    },
  }}
  value={value}
  onChange={handleChange}
  aria-label="basic tabs example"
>
  <Tab
    label="Impact Index"
    {...a11yProps(0)}
    sx={{
      fontSize:'1.25rem',
      fontWeight: 'bold',// --- Default button styles for all tabs ---
      color: 'text.primary', // Default text color
      backgroundColor: '#FFFFFF', // Light grey background
      borderRadius: '0px', // Rounded corners for button look
      padding: '10px 20px', // More padding for a button feel
      minHeight: '48px', // Ensure a consistent height
      opacity: 1, // Ensure full opacity for unselected tabs
      textTransform: 'none', // Prevent uppercase text
      '&:hover': {
        backgroundColor: '#e0e0e0', 
        borderRadius: '50px',// Slightly darker on hover
      },
      // --- Styles for the selected tab (active button) ---
      '&.Mui-selected': {
        color: 'black', // black text for selected button
        backgroundColor: '#FFFFFF', // Primary blue background for selected button
        fontWeight: 'bold',
        borderRadius: '50px', // Bold text for selected button
      },
    }}
  />
  <Tab
    label="Core Metrics"
    {...a11yProps(1)}
    sx={{
      fontSize:'1.25rem',
      fontWeight: 'bold',
      color: 'text.primary',
      backgroundColor: '#FFFFFF',
      borderRadius: '0px',
      padding: '10px 20px',
      minHeight: '48px',
      opacity: 1,
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#e0e0e0',
         borderRadius: '50px',
      },
      '&.Mui-selected': {
        color: 'black',
        backgroundColor: '#FFFFFF',
        fontWeight: 'bold',
         borderRadius: '50px',
      },
    }}
  />
  <Tab
    label="Personal Wellbeing"
    {...a11yProps(2)}
    sx={{
      fontSize:'1.25rem',
      fontWeight: 'bold',
      color: 'text.primary',
      backgroundColor: '#FFFFFF',
      borderRadius: '0px',
      padding: '10px 20px',
      minHeight: '48px',
      opacity: 1,
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#e0e0e0',
         borderRadius: '50px',
      },
      '&.Mui-selected': {
        color: 'black',
        backgroundColor: '#FFFFFF',
        fontWeight: 'bold',
         borderRadius: '50px',
      },
    }}
  />
  <Tab
    label="Community Wellbeing"
    {...a11yProps(3)}
    sx={{
      fontSize:'1.25rem',
      fontWeight: 'bold',
      color: 'text.primary',
      backgroundColor: '#FFFFFF',
      borderRadius: '0px',
      padding: '10px 20px',
      minHeight: '48px',
      opacity: 1,
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#e0e0e0',
         borderRadius: '50px',
      },
      '&.Mui-selected': {
        color: 'black',
        backgroundColor: '#FFFFFF',
        fontWeight: 'bold',
         borderRadius: '50px',
      },
    }}
  />

  <Tab
    label="Spiritual Wellbeing"
    {...a11yProps(4)}
    sx={{
      fontSize:'1.25rem',
      fontWeight: 'bold',
      color: 'text.primary',
      backgroundColor: '#FFFFFF',
      borderRadius: '0px',
      padding: '10px 20px',
      minHeight: '48px',
      opacity: 1,
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#e0e0e0',
         borderRadius: '50px',
      },
      '&.Mui-selected': {
        color: 'black',
        backgroundColor: '#FFFFFF',
        fontWeight: 'bold',
         borderRadius: '50px',
      },
    }}
  />
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
      <CustomTabPanel value={value} index={3}>
        <CommunityWellbeing />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <SpiritualWellbeing />
      </CustomTabPanel>
    </Box>
  );
}

export default MainLayout;
