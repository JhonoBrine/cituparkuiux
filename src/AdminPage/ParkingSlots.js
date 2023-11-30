import React from 'react';
import { Grid, Box, Button } from '@mui/material';
import './styleAdmMain/AdminStyle.css';

const ParkingSlots = () => {
  return (
    <div className="admin-parkingSlotsContainer">
      <Grid container spacing={2} className="customGrid">
        <Grid item xs={12}>
          <Box className="customBox" style={{marginLeft: '5%',outline: '5px solid #f6c301', marginTop: '50px'}}>
            <div className='customSlot-main'>
              <Grid container style={{ backgroundColor: 'gold', width: '90%', color:'maroon',marginBottom:'10px'}}>
                  <div className='slot-Bar'>
                    <ul>
                      <li className='space2'>TOTAL PARKING SLOT: <span>30</span></li>
                      <li className='space2'>AVAILABLE PARKING SLOTS: <span>10</span></li>
                      <li className='space2'>OCCUPIED SLOTS: <span>20</span></li>
                    </ul>
                  </div>
              </Grid>
                <div className='slot-secondary'>
                    <div className='nav-leftMain'>
                      <ul>
                        <li>ALL</li>
                        <li>RTL BLDG</li>
                        <li>NGE BLDG</li>
                        <li>GLE BLDG</li>
                        <li>BACK GATE</li>
                        <li>LIBRARY</li>
                      </ul>
                    </div>
                    <Grid container className='result' style={{ backgroundColor: '#d9d9d9', width: '80%', height: '450px', marginLeft: '10px'}}>
                      <p style={{ color: 'white' }}>SLOTS HERE</p>
                    </Grid>  
                    </div>
                  
                </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default ParkingSlots;
