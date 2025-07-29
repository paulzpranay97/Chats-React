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
      tooltip: { enabled: true },
      legend: { display: false }, // Disable legend for a cleaner UI
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Typography variant="h6" component="h3">
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
const renderSpeedometerChart = () => {
  const missionImpactValue = 2.22;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Typography variant="h6" component="h3">
        Mission-wide Impact Index
      </Typography>
      <Box sx={{ height: 160 }}>
        <ReactSpeedometer
          value={missionImpactValue}
          maxValue={100}
          needleColor="#8A2BE2"
          startColor="#E0E0E0"
          endColor="#D8B4FE"
          segments={1}
          forceRender={true}
          currentValueText={`${missionImpactValue}/100`}
          valueTextFontSize="22px"
          labelFontSize="0px"
          needleTransitionDuration={1000}
          needleTransition="easeElastic"
          ringWidth={20}
          height={150}
          width={250}
        />
      </Box>
      <Typography variant="body2" textAlign="center">
        It is estimated that TheLight's missional impact contributes an additional 2.22% to all of Melbourne's Wellbeing.
      </Typography>
    </Box>
  );
};

const ImpactIndex = () => {
  const reachScoreValue = 8.9;
  const contributionScoreValue = 25;

  return (
    <Box sx={{ width: '95vw',  bgcolor: '#F8FAFC', p: 4, boxSizing: 'border-box', border: '1px solid #951010ff' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          height: '200px',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          gap: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign={{ xs: 'center', md: 'left' }}>
          IMPACT INDEX
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontStyle: 'italic', textAlign: { xs: 'center', md: 'center' }, maxWidth: 500 }}
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
        {/* Reach Score */}
        <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 300 }}>
          {renderGaugeChart(
            reachScoreValue,
            'Reach Score',
            'It is estimated that TheLight is reaching 8.89% of the Target Achievable Mission.',
            '#FBCFE8'
          )}
        </Paper>

        {/* Speedometer */}
        <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 300 }}>
          {renderSpeedometerChart()}
        </Paper>

        {/* Contribution Score */}
        <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 300 }}>
          {renderGaugeChart(
            contributionScoreValue,
            'Contribution Score',
            "It is estimated that TheLight contributes an increase to someone's Personal, Community, and Spiritual Wellbeing by 25%.",
            '#D8B4FE'
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default ImpactIndex;
