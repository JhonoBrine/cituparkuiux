import React, { useState } from 'react';
import { Grid, Box, TextField, Button, Popover, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './styleAdmMain/AdminStyle.css';
import './AppBar.js';

const SearchUser = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userType, setUserType] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserTypeChange = (selectedUserType) => {
    setUserType(selectedUserType);
    handleClose();
  };

  const handleSearchUser = () => {
    navigate('/admin/search-result');
  };

  return (
    <div className="admin-searchUserContainer">
      <Grid container spacing={2} className="customGrid">
        <Grid item xs={12}>
          <Box className="customBox" style={{marginLeft: '5%', marginTop: '50px',outline: '5px solid #f6c301'}}>
            <div className='TextField'>
              <div className='test'>
                <TextField
                  id="outlined-basic"
                  label="SEARCH USER"
                  variant="outlined"
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                />
              </div>
              <div className='test'>
                <TextField
                  id="outlined-basic"
                  label="USER TYPE"
                  variant="outlined"
                  onClick={handleClick}
                  value={userType}
                />
                <Popover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <List className='Usertype-popup'>
                    {['STUDENT', 'EMPLOYEE', 'SECURITY GUARD', 'ADMIN'].map((type) => (
                      <ListItem button key={type} onClick={() => handleUserTypeChange(type)}>
                        <ListItemText primary={type} />
                      </ListItem>
                    ))}
                  </List>
                </Popover>
              </div>
            </div>

            <Grid container spacing={2} justifyContent="space-between">
              <Grid item>
                <Button
                  className='SUSearch'
                  style={{ backgroundColor: 'gold', marginLeft:'100px'}}
                  variant="contained"
                  onClick={handleSearchUser}
                >
                  SEARCH USER
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className='SUCancel'
                  style={{ backgroundColor: 'gold', color: 'maroon', fontWeight: 'bolder', marginRight:'100px'}}
                  variant="contained"
                >
                  CANCEL
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchUser;
