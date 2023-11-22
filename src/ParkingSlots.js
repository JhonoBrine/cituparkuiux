import React from 'react';
import { Grid, Box, Button } from '@mui/material';
import './App.css';

const ParkingSlots = () => {
  return (
    <div className="SearchResult">
      <Grid container spacing={2} className="customGrid">
        <Grid item xs={12}>
          <Box className="customBox">
            <Grid container style={{ backgroundColor: 'gold', width: '80%', marginLeft: '10%', color:'maroon',marginBottom:'10px'}}>
              <p className='space2'>TOTAL PARKING SLOT:</p><p className='space2'>AVAILABLE PARKING SLOT:</p><p className='space2'>OCCUPIED SLOTS:</p>
            </Grid>

            <Grid container className='result' style={{ backgroundColor: 'gray', width: '80%', marginLeft: '10%', height: '50%'}}>
              <p style={{ color: 'white' }}>SLOTS HERE</p>
            </Grid>  
            <div className='buttons'>
              <div className='SRCancel'>
                <Button style={{ backgroundColor: 'gold', color: 'maroon', fontWeight: 'bolder' }} variant="contained">
                  CANCEL
                </Button>
              </div>
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default ParkingSlots;
