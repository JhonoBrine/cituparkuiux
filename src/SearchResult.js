import React from 'react';
import { Grid, Box, Button } from '@mui/material';
import './App.css';

const SearchResult = () => {
  return (
    <div className="SearchResult">
      <Grid container spacing={2} className="customGrid">
        <Grid item xs={12}>
          <Box className="customBox">
            <Grid container style={{ backgroundColor: 'gold', width: '80%', marginLeft: '10%', color:'maroon'}}>
              <p className='space'>ID</p><p className='space'>NAME</p><p className='space'>VEHICLE</p>
            </Grid>

            <Grid container className='result' style={{ backgroundColor: 'gray', width: '80%', marginLeft: '10%', height: '50%'}}>
              <p style={{ color: 'white' }}>RESULT HERE</p>
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

export default SearchResult;
