import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ReactSpeedometer from 'react-d3-speedometer'; 
import axios from 'axios';


// MUI Imports
import { Box, Paper, Typography, Grid } from '@mui/material';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Helper function to render a Doughnut chart as a gauge
const renderGaugeChart = (value, title, description, color, max = 100) => {

    let fontsizecard = '';
    let piebgcolor = "" ;


    if( title === 'Reach Score' ){
      fontsizecard = '1.25rem';
      piebgcolor = '#FFE2F2';

    }else if( title === 'Contribution Score' ){
      fontsizecard = '2.25rem';
      piebgcolor = '#F9DFFF';

    }


  const data = {
    datasets: [
      {
        data: [value, max - value],
        backgroundColor: [color, piebgcolor],
        borderColor: [color, piebgcolor],
        borderWidth: 0,
        borderRadius: 0,
      },
    ],
  };

  const options = {
    rotation: 0,
    circumference: 360,
    cutout: '60%',
    plugins: {
      tooltip: { enabled: true },
      legend: { display: false }, // Disable legend for a cleaner UI
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Typography variant="h6" component="h3" sx={{ fontSize: fontsizecard , fontWeight: 'bold', color: '#333' }}>
        {title}
      </Typography>
      <Box sx={{ position: 'relative', width: '100%', maxWidth: 200, height: 200 }}>
        <Doughnut data={data} options={options} />
        <Typography
          variant="h5"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {value}%
        </Typography>
      </Box>
      <Typography variant="body2" textAlign="center">
        {description}
      </Typography>
    </Box>
  );
};


// Custom SVG-based Speedometer chart
const renderSpeedometerChart = (missionImpactValue) => {
  

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Typography variant="h6" component="h3" sx={{ fontSize: '1.25rem' , fontWeight: 'bold', color: '#333' }}>
        Mission-wide Impact Index
      </Typography>
      <Box sx={{ height: 200 }}>
        <ReactSpeedometer
          value={missionImpactValue}
          maxValue={100}
          needleColor="#D766FF"
          startColor="#EFADFF"
          endColor="#D8B4FE"
          segments={1}
          forceRender={true}
          currentValueText={`${missionImpactValue}/100`}
          valueTextFontSize="22px"
          labelFontSize="0px"
          needleTransitionDuration={1000}
          needleTransition="easeElastic"
          ringWidth={40}
          height={200}
          width={300}
        />
      </Box>
      <Typography variant="body2" textAlign="center">
        It is estimated that TheLight's missional impact contributes an additional 2.22% to all of Melbourne's Wellbeing.
      </Typography>
    </Box>
  );
};

const ImpactIndex = () => {

  const [widthScore, setWidthScore] = useState(0);
  const [contributionScore, setContributionScore] = useState(0);
  const [impactIndex, setImpactIndex] = useState(0);

  const reachScoreValue = impactIndex;
  const contributionScoreValue = contributionScore;
  const missionImpactValue = widthScore;


  useEffect(() => {
  const fetchData = async () => {
    const data = await get_impact_index_data();
    if (data) {
      console.log(data);

      setWidthScore(data?.width_score || 0);
      setContributionScore(data?.contribution_score || 0);
      setImpactIndex(data?.impact_index || 0);
    }
  };

  fetchData();
}, []);

    const get_impact_index_data = async () => {

      console.log("checked impact index data");
      
      try {
        const response = await fetch("https://score.impactindex.app/impact_index/?location_id=V7jzbIYZWXwQXczlF32Z", {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
        });

        const jsonData = await response.json();
        console.log("Impact Index Data:", jsonData);
        return jsonData;
       
      
      
        
      } catch (error) {
        console.error("Error fetching impact index data:", error);
        return null;
      }
    };

  


  return (
    <Box sx={{ width: '95vw',  bgcolor: '#F8FAFC', p: 4, boxSizing: 'border-box', backgroundColor: '#E5EAFB',}}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          height: '120px',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          gap: 2,
          
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign={{ xs: 'center', md: 'left' }} sx={{fontSize: '3rem'}}>
          IMPACT INDEX
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontStyle: 'italic', textAlign: { xs: 'center', md: 'center' }, maxWidth: 400 , fontSize: '1.4rem' }}
        >
          It is estimated that TheLight contributes an increase to someone's Personal, Community,
          and Spiritual Wellbeing by 25%.
        </Typography>
      </Box>

      {/* Charts Row */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'center',
          alignItems: 'stretch',
          gap: 3,
        }}
      >

          <Box
            sx={{
              display: 'flex',
              width: '50%',
              flexDirection: { xs: 'row', md: 'row' },
              justifyContent: 'center',
              alignItems: 'stretch',
              gap: 3,
            }}
          >
                {/* Reach Score */}
                <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 300, borderRadius: 4 }}>
                  {renderGaugeChart(
                    reachScoreValue,
                    'Reach Score',
                    'It is estimated that TheLight is reaching 8.89% of the Target Achievable Mission.',
                    '#FF67BB'
                  )}
                </Paper>

                {/* Speedometer */}
                <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 350,borderRadius: 4  }}>
                  {renderSpeedometerChart(missionImpactValue)}
                </Paper>
            
          </Box>

          <Box
            sx={{
              display: 'flex',
              width: '50%',
              flexDirection: { xs: 'row', md: 'row' },
              justifyContent: 'center',
              alignItems: 'stretch',
              gap: 3,
            }}
          >

          {/* Contribution Score */}
          <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 350 , borderRadius: 4 }}>
            {renderGaugeChart(
              contributionScoreValue,
              'Contribution Score',
              "It is estimated that TheLight contributes an increase to someone's Personal, Community, and Spiritual Wellbeing by 25%.",
              '#D766FF'
            )}
          </Paper>
            
          </Box>
         
      </Box>
    </Box>
  );
};

export default ImpactIndex;
