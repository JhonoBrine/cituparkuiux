import React, { useState } from 'react';
import { Grid, Box, TextField, Button, Popover, Typography, List, ListItem, ListItemText, Snackbar } from '@mui/material';
import './styleAdmMain/AdminStyle.css';

const CreateUser = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userType, setUserType] = useState('');
  const [stickerId, setStickerId] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

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

  const generateStickerId = () => {
    // Generate a random 3-digit number
    const newStickerId = Math.floor(100 + Math.random() * 900);
    setStickerId(newStickerId.toString());
  };

  const handleCreateUser = () => {
    // Additional logic to create user (you can add API calls or any other logic here)
    setSnackbarOpen(true);
    setPopoverOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  return (
    <div className="CreateUser">
      <Grid container spacing={2} className="customGrid">
        <Grid item xs={12}>
          <Box className="customBox">
            <div className='TextField'>
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
              <div className='test'>
                <TextField id="outlined-basic" label="ID NUMBER" variant="outlined" />
              </div>
              <div className='test'>
                <TextField id="outlined-basic" label="FIRST NAME" variant="outlined" />
              </div>
              <div className='test'>
                <TextField id="outlined-basic" label="LAST NAME" variant="outlined" />
              </div>
              <div className='test'>
                <TextField id="outlined-basic" label="VEHICLE TYPE" variant="outlined" />
              </div>
              <div className='test'>
                <TextField
                  id="outlined-basic"
                  label="STICKER ID"
                  variant="outlined"
                  style={{ marginLeft: '130px' }}
                  value={stickerId}
                  readOnly // make the field uneditable
                />
                <Button
                  style={{ backgroundColor: 'gold', marginLeft: '20px' }}
                  variant="contained"
                  onClick={generateStickerId}
                >
                  GENERATE
                </Button>
              </div>
              <div className='test'>
                <Button style={{ backgroundColor: 'gold' }} variant="contained" onClick={handleCreateUser}>
                  CREATE USER
                </Button>
              </div>
            </div>

            <div className='buttons'>
              <div className='BtnCancel'>
                <Button style={{ backgroundColor: 'gold', color: 'maroon', fontWeight: 'bolder' }} variant="contained">
                  CANCEL
                </Button>
              </div>
              {/* ... other buttons ... */}
            </div>
          </Box>
        </Grid>
      </Grid>

  {/* some optional shit */}
      {/* <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="USER SUCCESSFULLY CREATED"
      /> */}

      <Popover
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Box p={2}>
          <Typography className='CreateUser-PopUp'>USER SUCCESSFULLY CREATED</Typography>
          <Button style={{ backgroundColor: 'gold', marginTop: '10px' }} onClick={handlePopoverClose}>
            CLOSE
          </Button>
        </Box>
      </Popover>
    </div>
  );
};

export default CreateUser;
