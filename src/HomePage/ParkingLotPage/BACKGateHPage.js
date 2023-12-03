import React from 'react';
import { Grid, Box, Button } from '@mui/material';
import '../styleMain/forParkingSlot.css';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function BackGateHPage(){

    return(<>
    <div className="admin-parkingSlotsContainer">
      <Grid container spacing={2} className="customGrid">
        <Grid item xs={12}>
          <Box className="customBox" style={{marginLeft: '5%',outline: '5px solid #f6c301', marginTop: '50px'}}>
            <div className='customSlot-main'>
              <Grid container style={{ backgroundColor: 'gold', width: '1097px', color:'maroon',marginBottom:'10px', marginLeft: "56px", borderRadius: "25px 25px 0 0"}}>
                  <div className='slot-Bar'>
                    <ul>
                      <li>TOTAL PARKING SLOT: <span className='slot-count'>30</span></li>
                      <li>AVAILABLE PARKING SLOTS: <span className='slot-count'>10</span></li>
                      <li>OCCUPIED SLOTS: <span className='slot-count'>20</span></li>
                    </ul>
                  </div>
              </Grid>
                <div className='slot-secondary'>
                    <div className='nav-leftMain'>
                      <ul>
                        <CustomLink to="/parkingLotView">ALL</CustomLink>
                        <CustomLink to="/parkingLotView/rtl">RTL BLDG</CustomLink>
                        <CustomLink to="/parkingLotView/nge">NGE BLDG</CustomLink>
                        <CustomLink to="/parkingLotView/gle">GLE BLDG</CustomLink>
                        <CustomLink to="/parkingLotView/backgate">BACK GATE</CustomLink>
                        <CustomLink to="/parkingLotView/library">LIBRARY</CustomLink>

                      </ul>
                    </div>
                    <Grid container className='result' style={{ backgroundColor: '#d9d9d9', width: '80%', height: '550px', marginLeft: '10px'}}>
                     
                    </Grid>  
                    </div>
                  
                </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  </>);
};

function CustomLink({ to, children, ...props}){
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({path: resolvedPath.pathname, end: false});
  return (

      <li className={isActive ? "active" : ""}>
          <Link to={to}>{children}</Link>
      </li>
  )
}
