import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut,Bar } from 'react-chartjs-2';
import ReactSpeedometer from 'react-d3-speedometer'; 



// MUI Imports
import { Box, Paper, Typography, Grid, LinearProgress, Button } from '@mui/material';


// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);


  const renderStatsDetails = (buttonText, score_type) => {


    let bgColorGR = '';
    let flipIcon = '';

    if(score_type === "HIGHEST SCORES"){
      bgColorGR = '#2E8E46';
      flipIcon = 'scaleY(1)';
    }else if(score_type === "LOWEST SCORES"){
      bgColorGR = '#D23737';
      flipIcon = 'scaleY(-1)';
    }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      
      <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
            <Box
                sx={{
                    backgroundColor: bgColorGR, // bg-green-500
                    borderRadius: '9999px', // rounded-full
                
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                  
                }}
                >
                    <i class="ri-funds-line" style={{ fontSize: '30px', transform: flipIcon }} ></i>
                {/* <TrendingUpIcon sx={{ fontSize: 24, color: 'white' }} /> size={24} color="white" */}
            </Box>
            <Typography variant="h4" fontWeight="600" textAlign={{ xs: 'center', md: 'left' }} sx={{fontSize: '1rem'}}>
          {score_type}
        </Typography>
      </Box>

      
      <Typography
            variant="h1" // Large variant for the score
            sx={{
              color: bgColorGR, // text-blue-900
              fontWeight: 'bold', // font-bold
              fontSize: '4rem', // text-6xl (approx)
              mt: 2, // mt-4
              mb: 2, // mb-4
            }}
          >
            72
          </Typography>
      <Button
            variant="contained"
            sx={{
              backgroundColor: bgColorGR, // bg-green-600
              color: 'white',
              fontWeight: 'bold', // font-bold
              py: 1.5, // py-3
              px: 6, // px-12
              borderRadius: '9999px', // rounded-full
              fontSize: '1.5rem', // text-2xl
              letterSpacing: '0.05em', // tracking-wider
              textTransform: 'none', // Prevent uppercase default from MUI Button
              '&:hover': {
                backgroundColor: '#15803d', // Slightly darker green on hover
              },
            }}
          >
            {buttonText}
          </Button>
    </Box>
  );
  };


// Custom SVG-based Speedometer chart
const renderGaugeChart = (value, title, color, max = 100) => {
  
    


  const data = {
    datasets: [
      {
        data: [value, max - value],
        backgroundColor: [color, '#E5EBFF'],
        borderColor: [color, '#E5EBFF'],
        borderWidth: 0,
        borderRadius: 0,
      },
    ],
  };

  const options = {
    rotation: 270,
    circumference: 180,
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
      
      

      <Box sx={{ position: 'relative', width: '100%', maxWidth: 200, height: 200 }}>
        <Doughnut data={data} options={options} />
        <Typography
        variant="h5"
        sx={{
            position: 'absolute',
            bottom: 20,
            left: '52%',
            transform: 'translate(-50%, -50%)',
            fontSize: '2rem',
            fontWeight: 'bold',
           
        }}
        >
        {value}%
        </Typography>
        <Typography
        variant="h5"
        sx={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '1rem',
            minWidth: '100px',
            color: color,
        }}
        >
        {title}
        </Typography>
       
    </Box>
      <Box sx={{ width: 'px', height: '20px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <i class="ri-arrow-down-circle-fill" style={{fontSize: '60px', color: '#2FDD92'}}></i>
        
      </Box>
    </Box>
  );
};

const PersonalWellbeing = () => {




  




    useEffect(() => {
    const fetchData = async () => {
        
        const score_data = await get_score_data();
        if ( score_data) {

          
            console.log("score_data", score_data);



        }
    };

    fetchData();
    }, []);

 

    const get_score_data = async () => {
      try {
        const score_res = await fetch("https://score.impactindex.app/core_metrics/circles/?location_id=V7jzbIYZWXwQXczlF32Z", {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
        });

        const score_res_jsonData = await score_res.json();
        return score_res_jsonData;

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
          height: 'auto',
          flexDirection: { xs: 'row', md: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
          mb: 2,
          gap: 2,
          
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign={{ xs: 'center', md: 'center' }} sx={{fontSize: '3rem'}}>
          Personal Wellbeing
        </Typography>
      </Box>

      {/* Charts Row */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'center',
          alignItems: 'stretch',
          gap: 3
        }}
      >

        
                

                   
                     <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'column' },
                                justifyContent: 'start',
                                alignItems: 'stretch',
                                gap: 3,
                                // border: '1px solid red',
                            }}
                        >

                          
                            <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: { xs: 'row', md: 'row' },
                                        justifyContent: 'center',
                                        alignItems: 'stretch',
                                        boxSizing: 'border-box',
                                        padding: 2,
                                        gap: 3,
                                        border: '5px solid #778AD5',
                                        backgroundColor: '#f4f4f4',
                                        borderRadius: 4,
                                    }}
                                >

                                     
                                    <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 100,borderRadius: 4 , backgroundColor: 'transparent', boxShadow: 'none'}}>
                                    {renderGaugeChart(60,'MENTAL', '#004AAD')}
                                    </Paper>
                                    <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 100,borderRadius: 4 , backgroundColor: 'transparent', boxShadow: 'none'}}>
                                    {renderGaugeChart(60,'PHYSICAL', '#004AAD')}
                                    </Paper>
                                    <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 100,borderRadius: 4 , backgroundColor: 'transparent', boxShadow: 'none'}}>
                                    {renderGaugeChart(60,'FINANCIAL', '#004AAD')}
                                    </Paper>
                                    <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 100,borderRadius: 4 , backgroundColor: 'transparent', boxShadow: 'none'}}>
                                    {renderGaugeChart(60,'INTELLECTUAL', '#004AAD')}
                                    </Paper>
                                    <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 100,borderRadius: 4 , backgroundColor: 'transparent', boxShadow: 'none'}}>
                                    {renderGaugeChart(60,'PURPOSE', '#004AAD')}
                                    </Paper>
                                    
                            </Box>

                            <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: { xs: 'row', md: 'row' },
                                        justifyContent: 'center',
                                        alignItems: 'stretch',
                                        gap: 3,
                                        // border: '1px solid red',
                                    }}
                                >

                                     
                                    <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 100,borderRadius: 4 , backgroundColor: '#f4f4f4', border: '5px solid #2E8E46'}}>
                                    {renderStatsDetails('CALM','HIGHEST SCORES')}
                                    </Paper>
                                    <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 100,borderRadius: 4 , backgroundColor: '#f4f4f4', border: '5px solid #2E8E46'}}>
                                    {renderStatsDetails('INTELLECTUAL','HIGHEST SCORES')}
                                    </Paper>
                                    <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 100,borderRadius: 4 , backgroundColor: '#f4f4f4', border: '5px solid #D23737'}}>
                                    {renderStatsDetails('FINANCIAL','LOWEST SCORES')}
                                    </Paper>
                                    <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 100,borderRadius: 4 , backgroundColor: '#f4f4f4', border: '5px solid #D23737'}}>
                                    {renderStatsDetails('FITNESS','LOWEST SCORES')}
                                    </Paper>
                                    
                            </Box>

                    </Box>


                

 
      </Box>
    </Box>
  );
};

export default PersonalWellbeing;
