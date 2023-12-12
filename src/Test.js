{/* <div className='test'>
<TextField
  id="outlined-basic"
  label="USER TYPE"
  variant="outlined"
  onClick={handleClick}
  value={userType.userType || ''}
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
    {userTypeObjects.map((type) => (
      <ListItem button key={type.userTypeID} onClick={() => handleUserTypeChange(type)}>
        <ListItemText primary={type.userType} />
      </ListItem>
    ))}
  </List>
</Popover>
</div> */}

import { Box, Button, Grid, MenuItem, Popover, Select, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './styleAdmMain/AdminStyle.css';
export default function CreateUser() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userType, setUserType] = useState({
    userTypeID: 0,
    userType: "",
  });

  // const [userType, setUserType] = useState({});
  const [stickerId, setStickerId] = useState('');
  const [birthDate, setBirthDate] = useState(dayjs(Date()));
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [popoverOpen, setPopoverOpen] = useState(false);

  const [userTypeObjects, setUserTypeObjects] = useState([{}]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserTypeChange = (selectedUserType) => {
    console.log('Selected User Type:', selectedUserType);
    // setUserType({
    //   userTypeID: selectedUserType.userTypeID,
    //   userType: selectedUserType.userType,
    // });
    setUserType({
      userTypeID: selectedUserType.userTypeID,
      userType: selectedUserType.userType,
    });
    
    setStickerId(''); // Track the selected user type ID
    handleClose();
  };
  
  
  

  const generateStickerId = () => {
    const newStickerId = Math.floor(100 + Math.random() * 900);
    setStickerId(newStickerId.toString());
  };

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  const handleCreateUser = () => {
    const updatedFirstName = firstName.trim();
    const updatedMiddleName = middleName.trim();
    const updatedLastName = lastName.trim();
      
    console.log('firstName:', firstName);
    console.log('middleName:', middleName);
    console.log('lastName:', lastName);
    console.log('birthDate:', birthDate);
    console.log('userType:', userType);
      
    
    const hasMiddleName = updatedMiddleName !== '';

    // const userTypeId = userType;

    const userData = {
      hasMiddleName: hasMiddleName,
      stickerGeneratedID: stickerId,
      userBirthDate: birthDate.format('YYYY-MM-DD'),
      userFName: updatedFirstName,
      userJoinedDate: new Date().toISOString(),
      userLName: updatedLastName,
      userMName: updatedMiddleName,
      userType: userType,
    };
      
    axios.post('http://localhost:8080/users', userData)
  .then(response => {
    console.log(response.data);
    console.log(response.data.userType);
    setPopoverOpen(true);
  })
  .catch(error => {
    console.error('Error creating user:', error);
    console.log('Request payload:', userData);
    console.error('Server response:', error.response);
  })
  .finally(() => {
    // Clear the text fields after the request completes (either success or failure)
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setBirthDate(dayjs(Date()));
    setUserType({
      userTypeID: 0,
      userType: "",
    });
    setStickerId("");
  });

    
  };

  useEffect(() => {
    axios.get('http://localhost:8080/user-types')
    .then(response => {
      setUserTypeObjects(response.data);
      console.log(response.data);
    })
    .then(data => {
      
      console.log('userTypeObject: ',userTypeObjects);
    })
    .catch(error => {
      console.error('Error creating user:', error);
      console.error('Server response:', error.response);
    });

  }, []);

  return (

    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="admin-createuserContainer">
        <div>
          <Grid container spacing={2} className="customGrid">
            <Grid item xs={12}>
              <Box className="customBox" style={{ marginLeft: '5%', marginTop: '50px', outline: '5px solid #f6c301' }}>
                <div className='TextField'>
                <div className='test'>
                  <Select
                    label="USER TYPE"
                    variant="outlined"
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    onOpen={handleClick}
                    value={userType.userType || ''}
                    onChange={(event) => handleUserTypeChange(event.target.value)}
                    style={{ width: '200px', color: 'blue', backgroundColor: 'white', /* other styles */ }}
                  >
                    {userTypeObjects.map((type) => (
                      <MenuItem key={type.userTypeID} value={type}>
                        {type.userType}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                  <div className='test'>
                    <TextField id="outlined-basic-fname" label="FIRST NAME" variant="outlined" value={firstName} onChange={(event) => setFirstName(event.target.value)}/>
                  </div>
                  <div className='test'>
                    <TextField id="outlined-basic-mname" label="MIDDLE NAME" variant="outlined" value={middleName} onChange={(event) => setMiddleName(event.target.value)}/>
                  </div>
                  <div className='test'>
                    <TextField id="outlined-basic-lname" label="LAST NAME" variant="outlined" value={lastName} onChange={(event) => setLastName(event.target.value)}/>
                  </div>
                  <div className='test'>
                    <DatePicker
                      label="BIRTH DATE"
                      defaultValue={birthDate}
                      onChange={(birthDate) => setBirthDate(birthDate)}
                    />
                  </div>
                  <div className='test'>
                    <TextField
                      id="outlined-basic"
                      label="STICKER ID"
                      variant="outlined"
                      style={{ marginLeft: '130px' }}
                      value={stickerId}
                      readOnly
                    />
                    <Button
                      style={{ backgroundColor: 'gold', marginLeft: '20px' }}
                      variant="contained"
                      onClick={generateStickerId}
                    >
                      GENERATE
                    </Button>
                  </div>
                </div>

                <div className='buttons'>
                  <div className='test'>
                    <Button style={{ backgroundColor: 'gold', color: 'maroon', fontWeight: 'bolder' }} variant="contained">
                      CANCEL
                    </Button>
                  </div>

                  <div className='test'>
                    <Button style={{ backgroundColor: 'gold' }} variant="contained" onClick={handleCreateUser}>
                      CREATE USER
                    </Button>
                  </div>
                </div>
              </Box>
            </Grid>
          </Grid>
        </div>

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
      </LocalizationProvider>
    </>
  );
}
