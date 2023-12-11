import React, { useState } from 'react';
import { Grid, Box, TextField, Button, Popover, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
    let userTypeToSearch = null;

    // Map the selected userType to its corresponding ID
    switch (userType) {
      case 'STUDENT':
        userTypeToSearch = 1;
        break;
      case 'EMPLOYEE':
        userTypeToSearch = 2;
        break;
      case 'SECURITY GUARD':
        userTypeToSearch = 3;
        break;
      case 'ADMIN':
        userTypeToSearch = 4;
        break;
      default:
        userTypeToSearch = null;
    }

    // Check if both searchUser and userType are empty
    if (!searchUser && !userTypeToSearch) {
      // If both are empty, retrieve all users
      axios.get(`http://localhost:8080/users`)
        .then(response => {
          const users = response.data;
          console.log("All Users:", users);
          console.log("Success!!");
        })
        .catch(error => {
          console.error('Error retrieving all users:', error);
        });
    } else if (!searchUser && userTypeToSearch) {
      // If searchUser is empty and userType is selected, retrieve users based on userType
      axios.get(`http://localhost:8080/user-types/${userTypeToSearch}`)
        .then(response => {
          const users = response.data;
          console.log(`Users of type ${userType}:`, users);
          console.log("Success!!");
        })
        .catch(error => {
          console.error(`Error retrieving ${userType} users:`, error);
        });
    } else {
      // If either searchUser or userType is not empty, perform the search
      axios.get(`http://localhost:8080/users/search/${searchUser}`)
        .then(response => {
          const user = response.data;
          // Open a dialog or any other way to display the search results
          console.log("User Details:", user);
          console.log("Success!!");
        })
        .catch(error => {
          console.error('Error searching user:', error);
        });
    }
  };

  return (
    <div className="admin-searchUserContainer">
      <Grid container spacing={2} className="customGrid">
        <Grid item xs={12}>
          <Box className="customBox" style={{ marginLeft: '5%', marginTop: '50px', outline: '5px solid #f6c301' }}>
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
                  style={{ backgroundColor: 'gold', marginLeft: '100px' }}
                  variant="contained"
                  onClick={handleSearchUser}
                >
                  SEARCH USER
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className='SUCancel'
                  style={{ backgroundColor: 'gold', color: 'maroon', fontWeight: 'bolder', marginRight: '100px' }}
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
