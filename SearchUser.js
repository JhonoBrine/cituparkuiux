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
  const [selectedUserForUpdate, setSelectedUserForUpdate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [updatePopUpOpen, setUpdatePopUpOpen] = useState(false);
  const [updatedUserDetails, setUpdatedUserDetails] = useState(null);
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

  const handleUpdateUser = (user) => {
    setSelectedUserForUpdate(user);
    setUpdatedUserDetails({ ...user }); // Set the user details for update
    setUpdatePopUpOpen(true); // Open the update popover
  };

  const handleUpdate = () => {
    console.log('Updating user with data:', updatedUserDetails);
  
    axios.put(`http://localhost:8080/users/${selectedUserForUpdate.userID}`, updatedUserDetails)
      .then(response => {
        console.log('User updated successfully');
        handleSearchUser();
        setUpdatePopUpOpen(false);
      })
      .catch(error => {
        console.error('Error updating user:', error);
        if (error.response) {
          console.error('Server responded with status code:', error.response.status);
          console.error('Response data:', error.response.data);
        } else if (error.request) {
          console.error('No response received from the server');
        } else {
          console.error('Error setting up the request:', error.message);
        }
      });
  };

  const handleDelete = (user) => {
    console.log('Delete user:', user);

    axios.delete(`http://localhost:8080/users/${user.userID}`)
      .then(response => {
        console.log('User deleted successfully');
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
          handleDetails(fetchedUsers);
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
            filteredUsers = allUsers.filter(user => user.userType && user.userType.userType === userType);
          }
          setUsers(filteredUsers);
          handleDetails(filteredUsers);
        })
        .catch(error => {
          console.error('Error retrieving all users:', error);
        });
    } else {
      axios.get(`http://localhost:8080/users/${searchUser}`)
        .then(response => {
          const user = response.data;
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
                      <Button variant="contained" onClick={() => handleUpdateUser(user)}>
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

      <Popover
        open={updatePopUpOpen}
        onClose={() => setUpdatePopUpOpen(false)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <div style={{ padding: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Update User Details
          </Typography>
          <TextField
            label="First Name"
            variant="outlined"
            value={updatedUserDetails?.userFName || selectedUserForUpdate?.userFName || ''}
            onChange={(e) => setUpdatedUserDetails({ ...updatedUserDetails, userFName: e.target.value })}
          />
          <TextField
            label="Middle Name"
            variant="outlined"
            value={updatedUserDetails?.userMName || selectedUserForUpdate?.userMName || ''}
            onChange={(e) => setUpdatedUserDetails({ ...updatedUserDetails, userMName: e.target.value })}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            value={updatedUserDetails?.userLName || selectedUserForUpdate?.userLName || ''}
            onChange={(e) => setUpdatedUserDetails({ ...updatedUserDetails, userLName: e.target.value })}
          />
          <TextField
            label="Birth Date"
            variant="outlined"
            value={updatedUserDetails?.userBirthDate || selectedUserForUpdate?.userBirthDate || ''}
            onChange={(e) => setUpdatedUserDetails({ ...updatedUserDetails, userBirthDate: e.target.value })}
          />
          <TextField
            label="Joined Date"
            variant="outlined"
            value={updatedUserDetails?.userJoinedDate || selectedUserForUpdate?.userJoinedDate || ''}
            onChange={(e) => setUpdatedUserDetails({ ...updatedUserDetails, userJoinedDate: e.target.value })}
          />
          <TextField
            label="Sticker Generated ID"
            variant="outlined"
            value={updatedUserDetails?.stickerGeneratedID || selectedUserForUpdate?.stickerGeneratedID || ''}
            onChange={(e) => setUpdatedUserDetails({ ...updatedUserDetails, stickerGeneratedID: e.target.value })}
          />
          <TextField
            label="User Type ID"
            variant="outlined"
            value={updatedUserDetails?.userTypeID || selectedUserForUpdate?.userTypeID || ''}
            onChange={(e) => setUpdatedUserDetails({ ...updatedUserDetails, userTypeID: e.target.value })}
          />
          <TextField
            label="Has Middle Name"
            variant="outlined"
            value={updatedUserDetails?.hasMiddleName || selectedUserForUpdate?.hasMiddleName || ''}
            onChange={(e) => setUpdatedUserDetails({ ...updatedUserDetails, hasMiddleName: e.target.value })}
          />
          <Button variant="contained" onClick={handleUpdate}>
            UPDATE
          </Button>
        </div>
      </Popover>
    </div>
  );
};

export default SearchUser;
