import React from 'react';
import { Grid, Box, Button } from '@mui/material';
import './styleAdmMain/AdminStyle.css';

const ParkingSlots = () => {
  return (
    <div className="SearchResult">
      <Grid container spacing={2} className="customGrid">
        <Grid item xs={12}>
          <Box className="customBox" style={{marginLeft: '5%', marginTop: '50px',outline: '5px solid #f6c301'}}>
            
            <Grid container style={{ backgroundColor: 'gold', width: '80%', marginLeft: '10%', color:'maroon',marginBottom:'10px'}}>
              <div>

                <div>
                <p className='space2'>TOTAL PARKING SLOT: <span>30</span></p>
                </div>
                <div>
                <p className='space2'>AVAILABLE PARKING SLOT: <span>10</span></p>
                </div>
                <div>
                <p className='space2'>OCCUPIED SLOTS: <span>20</span></p>
                </div>
              
              </div>
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
