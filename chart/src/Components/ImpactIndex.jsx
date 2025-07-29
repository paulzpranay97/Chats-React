import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ReactSpeedometer from 'react-d3-speedometer'; 

// MUI Imports
import { Box, Paper, Typography, Grid } from '@mui/material';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Helper function to render a Doughnut chart as a gauge
const renderGaugeChart = (value, title, description, color, max = 100) => {
  const data = {
    datasets: [
      {
        data: [value, max - value],
        backgroundColor: [color, '#E0E0E0'],
        borderColor: [color, '#E0E0E0'],
        borderWidth: 0,
        borderRadius: 0,
      },
    ],
  };

  const options = {
    rotation: 0,
    circumference: 360,
    cutout: '80%',
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        display: true,
      },
    },
    maintainAspectRatio: true,
    responsive: true,
  };

  return (
    <div>
      <Typography variant="h6" component="h3" >
        {title}
      </Typography>
      <Box >
        <Doughnut data={data} options={options} />
        <Typography variant="h5" >
          {value}%
        </Typography>
      </Box>
      <Typography variant="body2">
        {description}
      </Typography>
    </div>
  );
};

// Custom SVG-based Speedometer chart
const renderSpeedometerChart = () => {
  const missionImpactValue = 0;

  return (
    <div>
      <Typography variant="h6" component="h3">
        Mission-wide Impact Index
      </Typography>
      <Box  sx={{ height: 160 }}>
        <ReactSpeedometer
          value={missionImpactValue}
          maxValue={100}
          needleColor="#8A2BE2" 
          startColor="#E0E0E0"
          endColor="#D8B4FE"
          segments={1}
          forceRender={true}
          currentValueText={`${missionImpactValue}/100`}
          valueTextFontSize="30px"
          labelFontSize="0px" 
          needleTransitionDuration={1000}
          needleTransition="easeElastic"
          ringWidth={20}
          height={150}
          width={250}
        />
      </Box>
      <Typography variant="body2" className="text-sm text-gray-600 text-center mt-auto">
        It is estimated that TheLight's missional impact contributes an additional 2.22% to all of Melbourne's Wellbeing
      </Typography>
  </div>
  );
};

const ImpactIndex = () => {
  const reachScoreValue = 8.9;
  const contributionScoreValue = 25;

  return (
    <Grid container spacing={2} direction="column" sx={{ padding: 2, width: '100%' }}>
         <Grid item xs={12} sm={12} md={12}>
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={6} sm={6} md={6} justifyContent="center" alignItems="center">
                        <Typography variant="h4" component="h1">
                            IMPACT INDEX
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} justifyContent="center" alignItems="center">
                        <Typography variant="body1">
                            It is estimated that TheLight contributes an increase to someone's Personal, Community, and Spiritual Wellbeing by 25%.
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container direction="row" alignItems="center" justifyContent="center">
                    <Grid item xs={4} sm={4} md={4}>
                        {renderGaugeChart(
                        reachScoreValue,
                        "Reach Score",
                        "It is estimated that TheLight is reaching 8.89% of the Target Achievable Mission.",
                        "#FBCFE8"
                        )}
                    </Grid>

                    <Grid item xs={4} sm={4} md={4}>
                        {renderSpeedometerChart()}
                    </Grid>

                    <Grid item xs={4} sm={4} md={4}>
                        {renderGaugeChart(
                        contributionScoreValue,
                        "Contribution Score",
                        "It is estimated that TheLight contributes an increase to someone's Personal, Community, and Spiritual Wellbeing by 25%.",
                        "#D8B4FE"
                        )}
                    </Grid>
                </Grid>
         </Grid>
    </Grid>
  );
};

export default ImpactIndex;
