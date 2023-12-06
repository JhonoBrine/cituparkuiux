import React from 'react';
import { Grid, Box, Button } from '@mui/material';
import './sekyuCss/sekyuParkingLotView.css';
import { useNavigate } from 'react-router-dom';

const SearchResult = () => {
  const navigate = useNavigate();
  const handleSearchUser = () => {
    navigate('/admin/search-user');
  };
  return (
    <div className="admin-searchResultContainer">
      <Grid container spacing={2} className="customGrid" >
        <Grid item xs={12}>
          
            <Box className="customBox" style={{marginLeft: '5%', marginTop: '50px',outline: '5px solid #f6c301'}}>
              <div className='customBox-main'>
                {/* <Grid container style={{ backgroundColor: 'gold', width: '80%', marginLeft: '10%', color:'maroon'}}>
                  <p className='space'>ID</p><p className='space'>NAME</p><p className='space'>VEHICLE</p>
                </Grid> */}

                <div className='resTitleBar-container'>
                  <ul>
                    <li>ID</li>
                    <li>NAME</li>
                    <li>VEHICLE</li>
                    <li>BUTTONS</li>
                  </ul>
                </div>

                <div className='result-container'>
                    <ul>
                      <li>

                        <span>3</span>
                        <span>REY MAR SEGALLE</span>
                        <span>MOTORYCYCLE</span>
                        <span>
                          <button>DETAIL</button>
                          <button>UPDATE</button>
                          <button>DELETE</button>
                        </span>
                      </li>
                      
                      <br/>
                      <li>
                        
                        <span>4</span>
                        <span>JHON LORENZ PABROA</span>
                        <span>AIRPLANE</span>
                        <span>
                          <button>DETAIL</button>
                          <button>UPDATE</button>
                          <button>DELETE</button>
                        </span>
                      </li>

                    </ul>
                </div>

                
                <div className='buttons'>
                  {/* <div className='SRCancel'>
                    <Button style={{ backgroundColor: 'gold', color: 'maroon', fontWeight: 'bolder' }} variant="contained">
                      SEARCH
                    </Button>
                  </div> */}

                  <div className='SRCancel'>
                    <Button style={{ backgroundColor: 'gold', color: 'maroon', fontWeight: 'bolder' }} variant="contained" onClick={handleSearchUser}>
                      CANCEL
                    </Button>
                  </div>
                </div>
              </div>
            </Box>
        
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchResult;
