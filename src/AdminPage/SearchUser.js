import React, { useState, useEffect } from 'react';
import { Grid, Box, TextField, Button, Popover, List, ListItem, ListItemText, Modal, Typography, Paper } from '@mui/material';
import axios from 'axios';
import './styleAdmMain/AdminStyle.css';
import './AppBar.js';

const SearchUser = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userType, setUserType] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState([]);

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

  const handleDetails = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleUpdate = (user) => {
    // Handle the update logic (e.g., navigate to an update page)
    console.log('Update user:', user);
    // You can navigate to an update page here or perform any other update logic
  };

  const handleDelete = (user) => {
    console.log('Delete user:', user);

    // Perform the actual delete operation in the database
    axios.delete(`http://localhost:8080/users/${user.userID}`)
      .then(response => {
        console.log('User deleted successfully');
        // Optionally, you can refresh the user list after deletion
        handleSearchUser();
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSearchUser = () => {
    let userTypeToSearch = null;

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

    if (!searchUser && !userTypeToSearch) {
      axios.get(`http://localhost:8080/users`)
        .then(response => {
          const fetchedUsers = response.data;
          setUsers(fetchedUsers);
          handleDetails(fetchedUsers); // Assuming you want to display details of the first user
        })
        .catch(error => {
          console.error('Error retrieving all users:', error);
        });
    } else if (!searchUser && userTypeToSearch) {
      axios.get(`http://localhost:8080/users`)
        .then(response => {
          const allUsers = response.data;
          let filteredUsers = allUsers;
          if (userType) {
            filteredUsers = allUsers.filter(user => user.userType.userType === userType);
          }
          setUsers(filteredUsers);
          handleDetails(filteredUsers);
          console.log(filteredUsers);
          console.log("Success!!");
        })
        .catch(error => {
          console.error('Error retrieving all users:', error);
        });
    } else {
      axios.get(`http://localhost:8080/users/${searchUser}`)
        .then(response => {
          const user = response.data;
          console.log("User Details:", user);
          console.log("Success!!");
          setUsers([user]);
          handleDetails(user);
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

      <Modal
  open={modalOpen}
  onClose={handleCloseModal}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box className="customBox" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
    {selectedUser && (
      <Paper style={{ padding: '20px', maxHeight: '80vh', overflowY: 'auto' }}>
        {/* Display details of the selected user */}
        <Typography variant="h5" gutterBottom>
          User Details
        </Typography>
        <Typography variant="body1" gutterBottom>
          First Name: {selectedUser.userFName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Middle Name: {selectedUser.userMName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Last Name: {selectedUser.userLName}
        </Typography>
        
        {/* Display details of other users in the list */}
        {(Array.isArray(users) ? users : []).map((user) => (
          <div key={user.userID} style={{ margin: '10px 0' }}>
            <Typography variant="body1" gutterBottom>
              User ID: {user.userID}
            </Typography>
            <Typography variant="body1" gutterBottom>
              First Name: {user.userFName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Middle Name: {user.userMName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Last Name: {user.userLName}
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Button variant="contained" onClick={() => handleDetails(user)}>
                  DETAILS
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={() => handleUpdate(user)}>
                  UPDATE
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={() => handleDelete(user)}>
                  DELETE
                </Button>
              </Grid>
            </Grid>
          </div>
        ))}
        <Grid container spacing={2}>
          <Grid item>
            <Button variant="contained" onClick={handleCloseModal}>
              CLOSE
            </Button>
          </Grid>
        </Grid>
      </Paper>
    )}
  </Box>
</Modal>

    </div>
  );
};

export default SearchUser;
