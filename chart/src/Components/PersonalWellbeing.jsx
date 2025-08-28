import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale, LinearScale, BarElement, Title  } from 'chart.js';
import { Doughnut,Bar } from 'react-chartjs-2';
import ReactSpeedometer from 'react-d3-speedometer'; 
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';


import { Box, Paper, Typography, Grid, LinearProgress, Button,TextField } from '@mui/material';


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);


  const renderStatsDetails = (buttonText, score_type, value, treand) => {

       let main_buttonText = '';

        if (buttonText === "INTELLECTUAL") {
          main_buttonText = "LEARNING";
        } else if (buttonText === "SAFETY") {
          main_buttonText = "ATMOSPHERE";
        } else if (buttonText === "CLOSE RELATIONSHIPS") {
          main_buttonText = "RELATIONSHIPS";
        } else if (buttonText === "RECREATIONAL") {
          main_buttonText = "FUN";
        } else if (buttonText === "DISCIPLINES") {
          main_buttonText = "CHRISTIAN PRACTICES";
        } else if (buttonText === "COMMUNITY") {
          main_buttonText = "CHRISTIAN COMMUNITY";
        } else if (buttonText === "FAITH STATUS") {
          main_buttonText = "FAITH JOURNEY";
        } else {
          main_buttonText = buttonText;
        }



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
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} width={'100%'}>
      
      <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
            <Box
                sx={{
                    backgroundColor: bgColorGR, 
                    borderRadius: '9999px', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                  
                }}
                >
                    <i class="ri-funds-line" style={{ fontSize: '30px', transform: flipIcon }} ></i>
              
            </Box>
            <Typography variant="h4" fontWeight="600" textAlign={{ xs: 'center', md: 'left' }} sx={{fontSize: '1rem'}}>
              {score_type}
            </Typography>
      </Box>

      
      <Typography
            variant="h1" 
            sx={{
              color: bgColorGR, 
              fontWeight: 'bold', 
              fontSize: '4rem', 
              mt: 2, 
              mb: 2, 
            }}
          >
            {value}
          </Typography>
      <Button
            variant="contained"
            sx={{
              backgroundColor: bgColorGR, 
              color: 'white',
              fontWeight: 'bold', 
              py: 1.5, 
              px: 6, 
              borderRadius: '9999px',
              fontSize: '1.3rem',
              letterSpacing: '0.05em', 
              textTransform: 'none',
              '&:hover': {
                backgroundColor: bgColorGR,
              },
            }}
          >
            {main_buttonText}
          </Button>
    </Box>
  );
  };


  // Custom SVG-based Speedometer chart
  const renderGaugeChart = (value, title, color,trend) => {

    
    
      let icon;
      if(trend === "up"){
        icon = <><i class="ri-arrow-up-circle-fill" style={{fontSize: '60px', color: '#2FDD92'}}></i></>;
      }else if(trend === "down"){
        icon = <><i class="ri-arrow-down-circle-fill" style={{fontSize: '60px', color: '#D23737'}}></i></>;
        
      }else if(trend === "same"){
        icon = <><i class="ri-subtract-line" style={{fontSize: '37px', color: '#fcfcfcff', backgroundColor:'#FF8440', borderRadius: '5px'}}></i></>;
      }

      let main_title = '';

       
        if (title === "INTELLECTUAL") {
          main_title = "LEARNING";
        } else if (title === "SAFETY") {
          main_title = "ATMOSPHERE";
        } else if (title === "CLOSE RELATIONSHIPS") {
          main_title = "RELATIONSHIPS";
        } else if (title === "RECREATIONAL") {
          main_title = "FUN";
        } else if (title === "DISCIPLINES") {
          main_title = "CHRISTIAN PRACTICES";
        } else if (title === "COMMUNITY") {
          main_title = "CHRISTIAN COMMUNITY";
        } else if (title === "FAITH STATUS") {
          main_title = "FAITH JOURNEY";
        } else {
          main_title = title;
        }



       
            



    const data = {
      datasets: [
        {
          data: [value, 100 - value],
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
        legend: { display: false },
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
              bottom: 25,
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '1.6rem',
              fontWeight: 'bold',
            
          }}
          >
          {value}
          </Typography>
          <Typography
          variant="h5"
          sx={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '1rem',
              minWidth: '200px',
              color: color,
          }}
          >
          {main_title}
          </Typography>
        
      </Box>
        <Box sx={{ width: 'px', height: '20px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {icon}
        </Box>
      </Box>
    );
  };


  const renderGaugeChart2 = (value, title, color,trend) => {

    
    
      let icon;
      if(trend === "up"){
        icon = <><i class="ri-arrow-up-circle-fill" style={{fontSize: '60px', color: '#2FDD92'}}></i></>;
      }else if(trend === "down"){
        icon = <><i class="ri-arrow-down-circle-fill" style={{fontSize: '60px', color: '#D23737'}}></i></>;
        
      }else if(trend === "same"){
        icon = <><i class="ri-subtract-line" style={{fontSize: '37px', color: '#fcfcfcff', backgroundColor:'#FF8440', borderRadius: '5px'}}></i></>;
      }

      let main_title = '';

       if (title === "INTELLECTUAL") {
          main_title = "LEARNING";
        } else if (title === "SAFETY") {
          main_title = "ATMOSPHERE";
        } else if (title === "CLOSE RELATIONSHIPS") {
          main_title = "RELATIONSHIPS";
        } else if (title === "RECREATIONAL") {
          main_title = "FUN";
        } else if (title === "DISCIPLINES") {
          main_title = "CHRISTIAN PRACTICES";
        } else if (title === "COMMUNITY") {
          main_title = "CHRISTIAN COMMUNITY";
        } else {
          main_title = title;
        }


       
            



    const data = {
      datasets: [
        {
          data: [value, 100 - value],
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
        legend: { display: false },
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
              bottom: 25,
              // bottom: 50,
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '1.8rem',
              fontWeight: 'bold',
            
          }}
          >
          {value}
          </Typography>
          <Typography
          variant="h5"
          sx={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '1rem',
              fontWeight: 'bold',
              minWidth: '200px',
              color: color,
          }}
          >
          {main_title}
          </Typography>
        
      </Box>
        <Box sx={{ width: 'px', height: '20px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {icon}
        </Box>
      </Box>
    );
  };

const PersonalWellbeing = () => {

  const [startDate, setStartDate] = useState(moment().subtract(1, 'month').startOf('month'));
  const [endDate, setEndDate] = useState(moment().subtract(1, 'month').endOf('month'));
  const [personalWellbeingData, setPersonalWellbeingData] = useState(null); 
  
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const locationId = params.get('location_id') || 'V7jzbIYZWXwQXczlF32Z';

 
  const get_personal_wellbeing_data = useCallback(async (start, end) => {

 
    
    try {
     
      const formattedStartDate = start ? start.format('YYYY-MM-DD') : '';
      const formattedEndDate = end ? end.format('YYYY-MM-DD') : '';

      const url = new URL("https://score.impactindex.app/personal_wellbeing/");
      if(locationId){
        url.searchParams.append("location_id", locationId);
      }
      if (formattedStartDate) url.searchParams.append("start_date", formattedStartDate);
      if (formattedEndDate) url.searchParams.append("end_date", formattedEndDate);

     

      const personal_wellbeing_res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Accept": "application/json",
        
        },
      });

      if (!personal_wellbeing_res.ok) {
        throw new Error(`HTTP error! status: ${personal_wellbeing_res.status}`);
      }

      const personal_wellbeing_res_jsonData = await personal_wellbeing_res.json();
      return personal_wellbeing_res_jsonData;

    } catch (error) {
      console.error("Error fetching personal wellbeing data:", error);
      return null;
    }
  }, [locationId]);


  useEffect(() => {
    const initialFetch = async () => {
        const data = await get_personal_wellbeing_data(startDate, endDate);
        if (data) {
          
         
            

            setPersonalWellbeingData(data);
        }
    };
    initialFetch();
  }, [get_personal_wellbeing_data, startDate, endDate]);

  const handleApply = async () => {
    if (startDate && endDate && startDate.isAfter(endDate)) {
      alert("Start Date cannot be after End Date!");
      return;
    }
    const data = await get_personal_wellbeing_data(startDate, endDate);
    if (data) {

      setPersonalWellbeingData(data); 
    }
  };
  

   

  return (
    <Box sx={{ width: '95vw',  bgcolor: '#F8FAFC',p: {lg:4, md:4, xs:1}, boxSizing: 'border-box', backgroundColor: '#E5EAFB',}}>
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

      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Box
          sx={{
            width: { lg: '50%', md: '80%', xs: '100%' },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            mb: 2,
            gap: 2,
          }}
        >
          <DatePicker
            views={['year', 'month']}
            label="Select Month"
            minDate={moment().subtract(5, 'years')}
            maxDate={moment()}
            value={startDate}
            onChange={(newValue) => {
              if (newValue) {
                const start = moment(newValue).startOf('month');
                const end = moment(newValue).endOf('month');
                setStartDate(start);
                setEndDate(end);
              }
            }}
            renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleApply}
            sx={{
              mt: { xs: 2, md: 0 },
              width: { xs: '100%', md: 'auto', lg: '20%' },
              height: 55,
            }}
          >
            Apply
          </Button>
        </Box>
      </LocalizationProvider>
      
      </Box>

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
        <Typography variant="h5" fontWeight="bold" textAlign={{ xs: 'center', md: 'center' }} sx={{fontSize: '1rem'}}>
          Your community's assessment of their current personal wellbeing on a scale out of 100.
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
                                        flexWrap: 'wrap',
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
                                  { personalWellbeingData?.scores.map((score) => (
                                            <Paper
                                              key={`gauge-${score.name}`}
                                              sx={{width: {lg:'10%', md:'50%', xs: '100%'}, p: 3, flex: 1, textAlign: 'center', minHeight: 300,borderRadius: 4 , backgroundColor: 'transparent', boxShadow: 'none',  boxSizing: 'border-box', padding: 0}}
                                            >
                                              {renderGaugeChart(
                                                score.value,
                                                score.name.replace(/_/g, ' ').toUpperCase(),
                                                '#004AAD',
                                                score.trend
                                              )}
                                            </Paper>
                                          ))}
                                     
                                    {/* <Paper sx={{width: {lg:'10%', md:'50%', xs: '100%'}, p: 3, flex: 1, textAlign: 'center', minHeight: 100,borderRadius: 4 , backgroundColor: 'transparent', boxShadow: 'none'}}>
                                    {renderGaugeChart(60,'MENTAL', '#004AAD')}
                                    </Paper>
                                    */}


                                    <Box sx={{ width: '100%', borderRadius: '50%', display: 'flex', flexDirection:{md: 'row', xs: 'column'}, alignItems: 'center', justifyContent: 'center', gap: '50px' }} >
                                      <Typography style={{fontSize: '0.7rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px'}}> <i class="ri-arrow-up-circle-fill" style={{fontSize: '25px', color: '#2FDD92'}}></i> Higher compared to previous month</Typography>
                                      <Typography style={{fontSize: '0.7rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px'}}> <i class="ri-arrow-down-circle-fill" style={{fontSize: '25px', color: '#D23737'}}></i> Lower compared to previous month</Typography>
                                      <Typography style={{fontSize: '0.7rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px'}}> <i class="ri-subtract-line" style={{fontSize: '15px', color: '#fcfcfcff', backgroundColor:'#FF8440', borderRadius: '5px'}}></i> Equal compared to previous month</Typography>
                                    </Box>
                                    
                            </Box>
                            

                            <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        justifyContent: 'center',
                                        alignItems: 'stretch',
                                        gap: 3,
                                    }}
                                >
                                  <Paper sx={{width: {lg:'25%', md:'50%', xs: '100%'}, p: 3, flex: 1, textAlign: 'center', minHeight: 100,borderRadius: 4 , backgroundColor: '#f4f4f4', border: '5px solid #67aab2'}}>
                                    {renderGaugeChart2(
                                                personalWellbeingData?.circle_score,
                                                `${personalWellbeingData?.location_dashboard_name} Personal Score`,
                                                '#67aab2'
                                              )}
                                    </Paper>
                                    <Paper sx={{width: {lg:'25%', md:'50%', xs: '100%'}, p: 3, flex: 1, textAlign: 'center', minHeight: 100,borderRadius: 4 , backgroundColor: '#f4f4f4', border: '5px solid #67aab2'}}>
                                    {renderGaugeChart2(
                                                personalWellbeingData?.core_score,
                                                `${personalWellbeingData?.location_dashboard_name} Overall Score`,
                                                '#67aab2'
                                              )}
                                    </Paper>
                                     
                                    <Paper sx={{width: {lg:'25%', md:'50%', xs: '100%'}, p: 3, flex: 1, textAlign: 'center', minHeight: 100,borderRadius: 4 , backgroundColor: '#f4f4f4', border: '5px solid #2E8E46'}}>
                                    {renderStatsDetails(personalWellbeingData?.summary.max.name.replace(/_/g, ' ').toUpperCase(),'HIGHEST SCORES', personalWellbeingData?.summary.max.value, personalWellbeingData?.summary.max.trend)}
                                    </Paper>
                                    {/* <Paper sx={{width: {lg:'25%', md:'50%', xs: '100%'}, p: 3, flex: 1, textAlign: 'center', minHeight: 100,borderRadius: 4 , backgroundColor: '#f4f4f4', border: '5px solid #2E8E46'}}>
                                    {renderStatsDetails(personalWellbeingData?.summary.second_max.name.replace(/_/g, ' ').toUpperCase(),'HIGHEST SCORES', personalWellbeingData?.summary.second_max.value, personalWellbeingData?.summary.second_max.trend)}
                                    </Paper> */}
                                    <Paper sx={{width: {lg:'25%', md:'50%', xs: '100%'}, p: 3, flex: 1, textAlign: 'center', minHeight: 100,borderRadius: 4 , backgroundColor: '#f4f4f4', border: '5px solid #D23737'}}>
                                    {renderStatsDetails(personalWellbeingData?.summary.min.name.replace(/_/g, ' ').toUpperCase(),'LOWEST SCORES', personalWellbeingData?.summary.min.value, personalWellbeingData?.summary.min.trend)}
                                    </Paper>
                                    {/* <Paper sx={{width: {lg:'25%', md:'50%', xs: '100%'}, p: 3, flex: 1, textAlign: 'center', minHeight: 100,borderRadius: 4 , backgroundColor: '#f4f4f4', border: '5px solid #D23737'}}>
                                    {renderStatsDetails(personalWellbeingData?.summary.second_min.name.replace(/_/g, ' ').toUpperCase(),'LOWEST SCORES', personalWellbeingData?.summary.second_min.value, personalWellbeingData?.summary.second_min.trend)}
                                    </Paper> */}
                                    
                            </Box>

                            <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
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

                                  <Box sx={{ width: '100%', borderRadius: '50%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }} >
                                    <Typography style={{fontSize: '1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px'}}>Scores based on {personalWellbeingData?.total_records} responses from {personalWellbeingData?.location_dashboard_name} community.</Typography>
                                    {/* <Box sx={{ width: '100%', borderRadius: '50%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }} >
                                      <Typography style={{fontSize: '1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px'}}></Typography>
                                      <Typography style={{fontSize: '1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px'}}></Typography>
                                    </Box> */}
                                  </Box>
                                  
                                    
                            </Box>
                    </Box>
      </Box>
    </Box>
  );
};

export default PersonalWellbeing;
