import React from 'react';
import { Grid, Box, Button } from '@mui/material';
import './styleAdmMain/AdminStyle.css';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const ParkingSlots = () => {
  return (
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
                        <CustomLink to="/admin/parking-slots">ALL</CustomLink>
                        <CustomLink to="/admin/parking-slots/rtl">RTL BLDG</CustomLink>
                        <CustomLink to="/admin/parking-slots/nge">NGE BLDG</CustomLink>
                        <CustomLink to="/admin/parking-slots/gle">GLE BLDG</CustomLink>
                        <CustomLink to="/admin/parking-slots/backgate">BACK GATE</CustomLink>
                        <CustomLink to="/admin/parking-slots/library">LIBRARY</CustomLink>

                      </ul>
                    </div>
                    <Grid container className='result' style={{ backgroundColor: '#d9d9d9', width: '80%', height: '550px', marginLeft: '10px'}}>
                      <div className='bldg-container'>
                        <div className='rtl-container'>
                          <p>RTL BLDG</p>
                          <div className='rtl-box'>
                            <p>Available: <span style={{color: "green"}}>10</span></p>
                            <p>Occupied: <span style={{color: "red"}}>38</span></p>
                            <p>Total Slots: <span style={{color: "blue"}}>48</span></p>

                            <button>CLOSE</button>
                            <Link to="/admin/parking-slots/rtl"><button>VIEW</button></Link>
                          </div>
                        </div>
                        <div className='rtl-container'>
                          <p>NGE BLDG</p>
                          <div className='rtl-box'>
                            <p>Available: <span style={{color: "green"}}>10</span></p>
                            <p>Occupied: <span style={{color: "red"}}>38</span></p>
                            <p>Total Slots: <span style={{color: "blue"}}>48</span></p>

                            <button>CLOSE</button>
                            <Link to="/admin/parking-slots/nge"><button>VIEW</button></Link>
                          </div>
                        </div>
                        <div className='rtl-container'>
                          <p>GLE BLDG</p>
                          <div className='rtl-box'>
                            <p>Available: <span style={{color: "green"}}>10</span></p>
                            <p>Occupied: <span style={{color: "red"}}>38</span></p>
                            <p>Total Slots: <span style={{color: "blue"}}>48</span></p>

                            <button>CLOSE</button>
                            <Link to="/admin/parking-slots/gle"><button>VIEW</button></Link>
                          </div>
                        </div>
                        <div className='rtl-container'>
                          <p>BACK GATE</p>
                          <div className='rtl-box'>
                            <p>Available: <span style={{color: "green"}}>10</span></p>
                            <p>Occupied: <span style={{color: "red"}}>38</span></p>
                            <p>Total Slots: <span style={{color: "blue"}}>48</span></p>

                            <button>CLOSE</button>
                            <Link to="/admin/parking-slots/backgate"><button>VIEW</button></Link>
                          </div>
                        </div>
                        <div className='rtl-container'>
                          <p>LIBRARY</p>
                          <div className='rtl-box'>
                            <p>Available: <span style={{color: "green"}}>10</span></p>
                            <p>Occupied: <span style={{color: "red"}}>38</span></p>
                            <p>Total Slots: <span style={{color: "blue"}}>48</span></p>

                            <button>CLOSE</button>
                            <Link to="/admin/parking-slots/library"><button>VIEW</button></Link>
                          </div>
                        </div>
                      </div>
                    </Grid>  
                    </div>
                  
                </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
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

export default ParkingSlots;
