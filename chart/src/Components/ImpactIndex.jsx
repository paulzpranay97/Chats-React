import React, {  useEffect, useState, useCallback} from 'react';
import { useLocation } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ReactSpeedometer from 'react-d3-speedometer'; 

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';


import { Box, Paper, Typography, Grid,Button, TextField } from '@mui/material';


ChartJS.register(ArcElement, Tooltip, Legend);

const renderGaugeChartContributionReachScore = (value, title,  color, max, min, mid, maxC, minC, midC) => {



  
  

    let fontsizecard = '1.25rem';
    let piebgcolor = "#0000001a" ;

    let neg = '';
    let neu = '';
    let pos = '';

    let low_c = '';
    let mid_c = '';
    let high_c = '';

    if(title.startsWith("Impact") || title === "Contribution Score"){
        neg = 'Negative Under';
        neu = 'Neutral';
        pos = 'Positive';

        low_c = '#DC0050';
        mid_c = '#F3BB44';
        high_c = '#00C699';
    }else {
        neg = 'Low';
        neu = 'Mid';
        pos = 'High';

        low_c = minC;
        mid_c = midC;
        high_c = maxC;
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
    cutout: '85%',
    plugins: {
      tooltip: { enabled: true },
      legend: { display: false }, 
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Typography variant="h6" component="h3" sx={{ fontSize: '1.6rem' , fontWeight: 'bold', color: '#333' }}>
        {title}
      </Typography>
      <Box sx={{ position: 'relative', width: '100%',maxWidth: 300, height: 300 }}>
        <Doughnut data={data} options={options} />
        <Typography
          variant="h5"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontWeight: 'bold',
            backgroundColor: color,
            borderRadius: "50%", 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minWidth: '200px', 
            minHeight: '200px',
            boxSizing: 'border-box' 
          }}
        >
          {value}
        </Typography>
      </Box>
      <Box display={'flex'} flexDirection={'row'} gap={3}>
          <Typography variant="body2" textAlign="center" sx={{fontSize:"0.8em" , fontWeight: "bold"}}>
           {/* <i class="ri-square-fill" style={{marginLeft: '3px', color:'red'}}></i> 0-{min} */}
           <i className="ri-square-fill" style={{marginLeft: '3px', color: low_c}}></i> {neg} {min}
          </Typography>
          <Typography variant="body2" textAlign="center" sx={{fontSize:"0.8em" , fontWeight: "bold"}}>
           {/* <i className="ri-square-fill" sx={{marginLeft: '3px', color:'orange'}}></i> {min}-{mid} */}
           <i className="ri-square-fill" style={{marginLeft: '3px', color: mid_c}}></i> {neu} {min}-{mid}
          </Typography>
          <Typography variant="body2" textAlign="center" sx={{fontSize:"0.8em" , fontWeight: "bold"}}>
           {/* <i className="ri-square-fill" sx={{marginLeft: '3px', color:'green'}}></i> {mid}-{max} */}
           <i className="ri-square-fill" style={{marginLeft: '3px', color: high_c}}></i> {pos} {mid}+
          </Typography>
      </Box>
    </Box>
  );
};


const renderGaugeChartContribution = (value, title,  color, max, min, mid) => {
  

    let fontsizecard = '1.25rem';
    let piebgcolor = "#0000001a" ;

    let neg = '';
    let neu = '';
    let pos = '';

    let low_c = '';
    let mid_c = '';
    let high_c = '';

    if(title.startsWith("Impact") || title === "Contribution Score"){
        neg = 'Negative Under';
        neu = 'Neutral';
        pos = 'Positive';

        low_c = '#DC0050';
        mid_c = '#F3BB44';
        high_c = '#00C699';
    }else {
        neg = 'Low';
        neu = 'Mid';
        pos = 'High';

        low_c = '#00C699';
        mid_c = '#008A6B';
        high_c = '#004f3dcb';
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
    cutout: '85%',
    plugins: {
      tooltip: { enabled: true },
      legend: { display: false }, 
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Typography variant="h6" component="h3" sx={{ fontSize: '1.6rem' , fontWeight: 'bold', color: '#333' }}>
        {title}
      </Typography>
      <Box sx={{ position: 'relative', width: '100%',maxWidth: 300, height: 300 }}>
        <Doughnut data={data} options={options} />
        <Typography
          variant="h5"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontWeight: 'bold',
            backgroundColor: color,
            borderRadius: "50%", 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minWidth: '200px', 
            minHeight: '200px',
            boxSizing: 'border-box' 
          }}
        >
          {value}
        </Typography>
      </Box>
      <Box display={'flex'} flexDirection={'row'} gap={3}>
          <Typography variant="body2" textAlign="center" sx={{fontSize:"0.8em" , fontWeight: "bold"}}>
           {/* <i class="ri-square-fill" style={{marginLeft: '3px', color:'red'}}></i> 0-{min} */}
           <i className="ri-square-fill" style={{marginLeft: '3px', color: low_c}}></i> {neg} {min}
          </Typography>
          <Typography variant="body2" textAlign="center" sx={{fontSize:"0.8em" , fontWeight: "bold"}}>
           {/* <i className="ri-square-fill" sx={{marginLeft: '3px', color:'orange'}}></i> {min}-{mid} */}
           <i className="ri-square-fill" style={{marginLeft: '3px', color: mid_c}}></i> {neu} {min}-{mid}
          </Typography>
          <Typography variant="body2" textAlign="center" sx={{fontSize:"0.8em" , fontWeight: "bold"}}>
           {/* <i className="ri-square-fill" sx={{marginLeft: '3px', color:'green'}}></i> {mid}-{max} */}
           <i className="ri-square-fill" style={{marginLeft: '3px', color: high_c}}></i> {pos} {mid}+
          </Typography>
      </Box>
    </Box>
  );
};

const ImpactIndex = () => {

    const [startDate, setStartDate] = useState(moment().subtract(1, 'month').startOf('month'));
    const [endDate, setEndDate] = useState(moment().subtract(1, 'month').endOf('month'));

   
    const [totalRecords, setTotalRecords] = useState(0);

    const [reachScore, setReachScore] = useState(0);
    const [wideScore, setWideScore] = useState(0);
    const [wideScoreAA, setWideScoreAA] = useState(0);
    const [contributionScore, setContributionScore] = useState(0);
    const [contributionScoreb, setContributionScoreb] = useState(0);
    

    const [reachScoreMid, setReachScoreMid] = useState(0);
    const [reachScoreLow, setReachScoreLow] = useState(0);
    const [reachScoreHigh, setReachScoreHigh] = useState(0);

    const [reachScoreMidColor, setReachScoreMidColor] = useState('');
    const [reachScoreLowColor, setReachScoreLowColor] = useState('');
    const [reachScoreHighColor, setReachScoreHighColor] = useState('');

    const [wideScoreMid, setWideScoreMid] = useState(0);
    const [wideScoreLow, setWideScoreLow] = useState(0);
    const [wideScoreHigh, setWideScoreHigh] = useState(0);

    const [contributionScoreMid, setContributionScoreMid] = useState(0);
    const [contributionScoreLow, setContributionScoreLow] = useState(0);
    const [contributionScoreHigh, setContributionScoreHigh] = useState(0);

  

    const [conColor, setConColor] = useState('');
    const [reachColor, setReachColor] = useState('');
    const [wideColor, setWideColor] = useState('');

    
    const [locationName, setlocationName] = useState('');
    const [targetPopulation, setTargetPopulation] = useState('');
    const [locationDashboardName, setLocationDashboardName] = useState('');

    
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const locationId = params.get('location_id') || 'V7jzbIYZWXwQXczlF32Z';

    
    const reachScoreValue = reachScore;
    const wideScoreValue = wideScore;
    const contributionScoreValue = contributionScore;
    
   

 const get_impact_index_data = useCallback(async (start, end) => {

   try {
      const formattedStartDate = start ? start.format('YYYY-MM-DD') : '';
      const formattedEndDate = end ? end.format('YYYY-MM-DD') : '';

      let url = new URL("https://score.impactindex.app/impact_index/");
      if(locationId){
        url.searchParams.append("location_id", locationId);
      }
      if (formattedStartDate) url.searchParams.append("start_date", formattedStartDate);
      if (formattedEndDate) url.searchParams.append("end_date", formattedEndDate);
        const response = await fetch(url.toString(), {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
        });
        const jsonData = await response.json();
        return jsonData;
      } catch (error) {
        console.error("Error fetching impact index data:", error);
        return null;
      }
    }, [locationId]);


useEffect(() => {
    const fetchData = async () => {
      const data = await get_impact_index_data(startDate, endDate);
      if (data) {

        const contributionScore = data.contribution_score_a || 0;
        const contributionScoreb = data.contribution_score_b || 0;
        const c_low = data.contribution_lower || 0;
        const c_mid = data.contribution_mid || 0;
        const c_high = data.contribution_upper_bound || 0;

        const reachScore = data.width_score || 0;
        const r_low = data.reach_lower || 0;
        const r_mid = data.reach_mid || 0;
        const r_high = data.reach_upper || 0;

        // const r_low_color = data.color_reach_lower || '#00C699';
        // const r_mid_color = data.color_reach_mid || '#008A6B';
        // const r_high_color = data.color_reach_upper || '#004f3dcb';
        const r_low_color =  '#00C699';
        const r_mid_color = '#008A6B';
        const r_high_color = '#004f3dcb';
      

        const wideScore = data.impact_index_b || 0;
        const wideScoreAA = data.impact_index_a || 0;
        const w_low = data.impact_lower || 0;
        const w_mid = data.impact_mid || 0;
        const w_high = data.impact_upper || 0;

        setlocationName(data.ghl_location_name || "")
        setTargetPopulation(data.target_population || "")
        setLocationDashboardName(data.location_dashboard_name || "")
        setTotalRecords(data.total_records || 0)

        setContributionScoreMid(c_mid);
        setContributionScoreLow(c_low);
        setContributionScoreHigh(c_high);
        setContributionScore(contributionScore);
        setContributionScoreb(contributionScoreb);

        setReachScoreMidColor(r_mid_color);
        setReachScoreLowColor(r_low_color);
        setReachScoreHighColor(r_high_color);

        setReachScoreMid(r_mid);
        setReachScoreLow(r_low);
        setReachScoreHigh(r_high);
        setReachScore(reachScore);


        setWideScoreMid(w_mid);
        setWideScoreLow(w_low);
        setWideScoreHigh(w_high);
        setWideScore(wideScore);
        setWideScoreAA(wideScoreAA);

        if (contributionScore < c_low) {
          setConColor('#DC0050');
        } else if (contributionScore >= c_low && contributionScore < c_mid) {
          setConColor('#F3BB44');
        } else if (contributionScore >= c_mid && contributionScore <= c_high) {
          setConColor('#00C699');
        } else {
          // Handle case where score is greater than high bound
          setConColor('blue'); // or some other color
        }


        if (reachScore < r_low) {
          setReachColor(r_low_color);
        } else if (reachScore >= r_low && reachScore < r_mid) {
          setReachColor(r_mid_color);
        } else if (reachScore >= r_mid && reachScore <= r_high) {
          setReachColor(r_high_color);
        } else {
          // Handle case where score is greater than high bound
          setReachColor('blue'); // or some other color
        }

        if (wideScore < w_low) {
          setWideColor('#DC0050');
        } else if (wideScore >= w_low && wideScore < w_mid) {
          setWideColor('#F3BB44');
        } else if (wideScore >= w_mid && wideScore <= w_high) {
          setWideColor('#00C699');
        } else {
          // Handle case where score is greater than high bound
          setWideColor('blue'); // or some other color
        }
      }
    };

    fetchData();
  }, [get_impact_index_data, startDate, endDate]);

   


    
  const handleApply = async () => {
    if (startDate && endDate && startDate.isAfter(endDate)) {
      alert("Start Date cannot be after End Date!");
      return;
    }
    const data = await get_impact_index_data(startDate, endDate);
    if (data) {

      if (data) {

        const contributionScore = data.contribution_score_a || 0;
        const contributionScoreb = data.contribution_score_b || 0;
        const c_low = data.contribution_lower || 0;
        const c_mid = data.contribution_mid || 0;
        const c_high = data.contribution_upper_bound || 0;

        const reachScore = data.width_score || 0;
        const r_low = data.reach_lower || 0;
        const r_mid = data.reach_mid || 0;
        const r_high = data.reach_upper || 0;

        // const r_low_color = data.color_reach_lower || '#00C699';
        // const r_mid_color = data.color_reach_mid || '#008A6B';
        // const r_high_color = data.color_reach_upper || '#004f3dcb';
        const r_low_color =  '#00C699';
        const r_mid_color = '#008A6B';
        const r_high_color = '#004f3dcb';
      

        const wideScore = data.impact_index_b || 0;
        const wideScoreAA = data.impact_index_a || 0;
        const w_low = data.impact_lower || 0;
        const w_mid = data.impact_mid || 0;
        const w_high = data.impact_upper || 0;

        setlocationName(data.ghl_location_name || "")
        setTargetPopulation(data.target_population || "")
        setLocationDashboardName(data.location_dashboard_name || "")
        setTotalRecords(data.total_records || 0)

        setContributionScoreMid(c_mid);
        setContributionScoreLow(c_low);
        setContributionScoreHigh(c_high);
        setContributionScore(contributionScore);
        setContributionScoreb(contributionScoreb);

        setReachScoreMidColor(r_mid_color);
        setReachScoreLowColor(r_low_color);
        setReachScoreHighColor(r_high_color);

        setReachScoreMid(r_mid);
        setReachScoreLow(r_low);
        setReachScoreHigh(r_high);
        setReachScore(reachScore);


        setWideScoreMid(w_mid);
        setWideScoreLow(w_low);
        setWideScoreHigh(w_high);
        setWideScore(wideScore);
        setWideScoreAA(wideScoreAA);

        if (contributionScore < c_low) {
          setConColor('#DC0050');
        } else if (contributionScore >= c_low && contributionScore < c_mid) {
          setConColor('#F3BB44');
        } else if (contributionScore >= c_mid && contributionScore <= c_high) {
          setConColor('#00C699');
        } else {
          // Handle case where score is greater than high bound
          setConColor('blue'); // or some other color
        }


        if (reachScore < r_low) {
          setReachColor(r_low_color);
        } else if (reachScore >= r_low && reachScore < r_mid) {
          setReachColor(r_mid_color);
        } else if (reachScore >= r_mid && reachScore <= r_high) {
          setReachColor(r_high_color);
        } else {
          // Handle case where score is greater than high bound
          setReachColor('blue'); // or some other color
        }

        if (wideScore < w_low) {
          setWideColor('#DC0050');
        } else if (wideScore >= w_low && wideScore < w_mid) {
          setWideColor('#F3BB44');
        } else if (wideScore >= w_mid && wideScore <= w_high) {
          setWideColor('#00C699');
        } else {
          // Handle case where score is greater than high bound
          setWideColor('blue'); // or some other color
        }
      }
    }
  };


  


  return (
    <Box sx={{ width: '95vw',  bgcolor: '#F8FAFC', p: {lg:4, md:4, xs:1}, boxSizing: 'border-box', backgroundColor: '#E5EAFB',}}>
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
      {/* Charts Row 3 */}
      <Box
        mt={{md:3, sm:3, xs: 3}}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column',lg:'row', md: 'column', sm:'column' },
          justifyContent: 'space-between',
          alignItems: 'stretch',
          gap: 3,
        }}
      >

                {/* Reach Score */}
                <Box sx={{ flex: 1 }} display={'flex'} flexDirection={'column'} gap={1}>
                  <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 400, borderRadius: 4, border: '5px solid #778AD5', }}>

                    {renderGaugeChartContributionReachScore(
                        reachScoreValue,
                        'Reach Score',
                        reachColor,
                        reachScoreHigh,
                        reachScoreLow,
                        reachScoreMid,
                        reachScoreHighColor,
                        reachScoreLowColor,
                        reachScoreMidColor
                      )}
                   
                  </Paper>

                  <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 140, borderRadius: 4, display: 'flex', justifyContent:'center', alignItems: "center", border: '5px solid #778AD5', backgroundColor: '#E5EAFB' }} mt={2}>
                      <Typography variant="body2" textAlign="center" sx={{ fontSize: "1.2rem", fontWeight:"bold" }}>
                      It is estimated that <span style={{ fontWeight: "bold" , color: '#3753c4ff' }}>{locationDashboardName}</span> is <span style={{ fontWeight: "bold" , color: '#3753c4ff' }}>reaching{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {reachScoreValue}%
                      </span>{" "}
                      of {targetPopulation}.</span>
                    </Typography>
                  </Paper>

                </Box >
                {/* Wide Score */}
                <Box sx={{ flex: 1 }} display={'flex'} flexDirection={'column'} gap={1}>
                      {/* Speedometer */}
                      <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 400,borderRadius: 4 , border: '5px solid #778AD5', }}>

                      {renderGaugeChartContribution(
                        wideScoreValue,
                        `Impact on ${targetPopulation}`,
                        wideColor,
                        wideScoreHigh,
                        wideScoreLow,
                        wideScoreMid
                        
                      )}
                        
                      </Paper>

                      <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 140, borderRadius: 4, display: 'flex', justifyContent:'center', alignItems: "center" , border: '5px solid #778AD5', backgroundColor: '#E5EAFB'}} mt={2}>
                          <Typography variant="body2" textAlign="center" sx={{ fontSize: "1.2rem", fontWeight:"bold" }}>
                            The Impact Index estimates that <span style={{ fontWeight: "bold" , color: '#3753c4ff' }}>{locationDashboardName}</span> contributes an <span style={{ fontWeight: "bold" , color: '#3753c4ff' }}>improvement of {wideScoreAA}% to {targetPopulation}'s overall wellbeing</span>, resulting in a score of <span style={{ fontWeight: "bold" , color: '#3753c4ff' }}>{wideScore}%</span>.
                          </Typography>
                      </Paper>

                </Box>
                {/* Contribution Score */}
                <Box sx={{ flex: 1 }}  display={'flex'} flexDirection={'column'} gap={1}>
                     <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 400 , borderRadius: 4, border: '5px solid #778AD5', }}>
                      {renderGaugeChartContribution(
                        contributionScoreValue,
                        'Contribution Score',
                        conColor,
                        contributionScoreHigh,
                        contributionScoreLow,
                        contributionScoreMid
                        
                      )}
                    </Paper>
                    <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 140, borderRadius: 4, display: 'flex', justifyContent:'center', alignItems: "center", border: '5px solid #778AD5', backgroundColor: '#E5EAFB'}}>
                           <Typography variant="body2" textAlign="center" sx={{ fontSize: "1.2rem", fontWeight:"bold" }}>
                            The Impact Index estimates that <span style={{ fontWeight: "bold" , color: '#3753c4ff' }}>{locationDashboardName}</span> contributes an <span style={{ fontWeight: "bold" , color: '#3753c4ff' }}>improvement of {contributionScoreb}% to {locationDashboardName} community's</span> overall wellbeing, resulting in a Contribution Score of  <span style={{ fontWeight: "bold" , color: '#3753c4ff' }}>{contributionScore}%</span>.
                          </Typography>
                    </Paper>
                </Box>
               
         
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
                                            mt={2}
                                        >
        
                                          <Box sx={{ width: '100%', borderRadius: '50%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }} >
                                            <Typography style={{fontSize: '1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px'}}>Scores based on {totalRecords} responses from {locationDashboardName} community.</Typography>
                                            {/* <Box sx={{ width: '100%', borderRadius: '50%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }} >
                                              <Typography style={{fontSize: '1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px'}}></Typography>
                                              <Typography style={{fontSize: '1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px'}}></Typography>
                                            </Box> */}
                                          </Box>
                                          
                                            
                                    </Box>
    </Box>
  );
};

export default ImpactIndex;
