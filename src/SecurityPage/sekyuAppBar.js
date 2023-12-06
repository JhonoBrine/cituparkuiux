import React from 'react';
import { Grid } from '@mui/material';
import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom';
import './styleAdmMain/AdminStyle.css';
import campus from './AdminImages/campus.jpg';


export default function App() {
  return (<>

      <div className='admin-container'>
        {/* <Box sx={{ width: '90%', bgcolor: 'gold', marginTop: '10px', marginLeft: '5%', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px'}}>
          <Tabs centered>
            <Tab style={{marginRight: '100px', color: 'maroon', fontWeight: 'bolder'}} label={<Link to="/admin/create-user">CREATE USER</Link>} />
            <p style={{color: 'white', fontWeight: 'bolder'}}> | </p>
            <Tab style={{marginRight: '100px', marginLeft: '100px', color: 'maroon', fontWeight: 'bolder'}} label={<Link to="/admin/search-user">SEARCH USER</Link>} />
            <p style={{color: 'white', fontWeight: 'bolder'}}> | </p>
            <Tab style={{marginRight: '100px', marginLeft: '100px', color: 'maroon', fontWeight: 'bolder'}} label={<Link to="/admin/parking-slots">PARKING SLOTS</Link>} />
          </Tabs>
        </Box> */}
        <div className='HomeGrid-container'>
          <Grid className='HomeGrid'container spacing={1} justifyContent="center" style={{width: '90%', marginLeft: '5%', marginTop: '50px',outline: '5px solid #f6c301'}}>
    
          <img className="campus" src={campus} alt="LOGO" />
            <Grid item xs={12} sm={6}>
            </Grid>
          </Grid>
        </div>
      </div>

    
  </>);
}
