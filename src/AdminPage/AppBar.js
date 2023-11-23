import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Grid } from '@mui/material';
import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom';
import './styleAdmMain/AdminStyle.css';
import campus from './AdminImages/campus.jpg';
import CreateUser from './CreateUser';
import SearchUser from './SearchUser';
import SearchResult from './SearchResult';
import ParkingSlots from './ParkingSlots';

export default function App() {
  return (
    <Router>
      <div>
        <Box sx={{ width: '90%', bgcolor: 'gold', marginTop: '10px', marginLeft: '5%', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px'}}>
          <Tabs centered>
            <Tab style={{marginRight: '100px', color: 'maroon', fontWeight: 'bolder'}} label={<Link to="/create-user">CREATE USER</Link>} />
            <p style={{color: 'white', fontWeight: 'bolder'}}> | </p>
            <Tab style={{marginRight: '100px', marginLeft: '100px', color: 'maroon', fontWeight: 'bolder'}} label={<Link to="/search-user">SEARCH USER</Link>} />
            <p style={{color: 'white', fontWeight: 'bolder'}}> | </p>
            <Tab style={{marginRight: '100px', marginLeft: '100px', color: 'maroon', fontWeight: 'bolder'}} label={<Link to="/parking-slots">PARKING SLOTS</Link>} />
          </Tabs>
        </Box>

        <Grid className='HomeGrid'container spacing={2} justifyContent="center" style={{width: '90%', marginLeft: '5%'}}>
        <img className="campus" src={campus} alt="LOGO" />
          <Grid item xs={12} sm={6}>
          </Grid>
        </Grid>
        <Routes>
              <Route path="/create-user" element={<CreateUser />} />
              <Route path="/search-user" element={<SearchUser />} />
              <Route path="/search-result" element={<SearchResult />} />
              <Route path="/parking-slots" element={<ParkingSlots/>} />
            </Routes>
      </div>
    </Router>
    
  );
}
