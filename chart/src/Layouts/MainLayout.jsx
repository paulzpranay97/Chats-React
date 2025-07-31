import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Tab,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

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
      {/* Conditional rendering of children only when the tab is active */}
      {value === index && (
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E5EAFB' }}>
          {children}
        </Box>
      )}
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
};

function App() { 
  const [value, setValue] = React.useState(0);
  const [drawerOpen, setDrawerOpen] = React.useState(false); 
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setDrawerOpen(false); 
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const tabLabels = [
    "Impact Index",
    "Core Metrics",
    "Personal Wellbeing",
    "Community Wellbeing",
    "Spiritual Wellbeing"
  ];

  return (
    <Box sx={{ width: '100%', backgroundColor: '#F6F6F6', minHeight: '100vh' }}>
      <Box
        sx={{
          height: 100,
          width: {lg:'100%', md:'90%', xs:'90%'},
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: '#F6F6F6',
          display: 'flex',
          justifyContent: isMobile ? 'flex-start' : 'center', 
          alignItems: 'center',
          px: isMobile ? 2 : 0, 
        }}
      >
        {isMobile ? (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2, color: 'black' }} 
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <Tabs
            centered
            sx={{
              width: '100%',
              height: '100%',
              display: "flex",
              justifyContent: 'center',
              alignItems: 'center',
              

              '.MuiTabs-indicator': {
                display: 'none',
              },
              '.MuiTabs-flexContainer': {
                gap: '10px', 
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: '#F6F6F6',
              },
            }}
            value={value}
            onChange={handleChange}
            aria-label="main navigation tabs"
          >
            {tabLabels.map((label, index) => (
              <Tab
                key={label}
                label={label}
                {...a11yProps(index)}
                
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: 'text.primary',
                  backgroundColor: '#F6F6F6',
                  borderRadius: '50px', 
                  padding: '10px 20px',
                  minHeight: '48px',
                  opacity: 1,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#e0e0e0',
                  },
                  '&.Mui-selected': {
                    color: 'black',
                    backgroundColor: '#FFFFFF',
                    fontWeight: 'bold',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  },
                }}
              />
            ))}
          </Tabs>
        )}
      </Box>

      {/* Side Drawer for mobile/tablet */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {tabLabels.map((label, index) => (
              <ListItem key={label} disablePadding>
                <ListItemButton
                  selected={value === index}
                  onClick={(event) => handleChange(event, index)}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: '#E5EAFB', 
                      fontWeight: 'bold',
                    },
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                    },
                  }}
                >
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Tab Panels */}
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

export default App;
