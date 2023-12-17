import { Box, Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import '../styleAdmMain/AdminStyle.css';

export default function BackGatePage(){
    const [parkingSlots, setParkingSlots] = useState([{}])
    const [specParkingLot, setSpecParkingLot] = useState([{}])

    const [is_available, setIs_available] = useState(true);
    const [avail_able, setAvail_able] = useState(true);

    const [is_employee, setIs_employee] = useState(false);
    const [emp_loyee, setEmp_loyee] = useState(false);

    const [isModalOpen, setModalOpen] = useState(false);
    {/*Fetched Data for Parking Lots */}

    useEffect(() => {
      fetchParkingSlotData();
      console.log("Parking Slots = BackGate: ", parkingSlots)
      fetchParkingLotData();
    }, [])

    const fetchParkingLotData = () => {
      axios.get('http://localhost:8080/parkinglots')
      .then((response) => {
        const temp_slots = response.data
        const filteredSlots = temp_slots.filter(slot => slot && slot.parkingLotID === 4);


        setSpecParkingLot(filteredSlots);
        console.log("Fetched Data: ", filteredSlots);
      })
      .catch((error) => {
        console.error("Error fetching parking data: ", error);
      })
    }

    const fetchParkingSlotData = () => {
      axios.get('http://localhost:8080/parking-slots')
      .then((response) => {
        console.log("Fetched Slot Data: ", response.data);
        const temp_slots = response.data;

      // Filter the parking slots based on parkingLotID === 4
      const filteredSlots = temp_slots.filter(slot => slot.parkingLot && slot.parkingLot.parkingLotID === 4);

      // Assuming you want to get parkingLotID from the first filtered slot
      if (filteredSlots.length > 0 && filteredSlots[0].parkingLot) {
        const hold_slot = filteredSlots[0].parkingLot.parkingLotID;
        console.log("Lot ID: ", hold_slot);
      }

      setParkingSlots(filteredSlots);
      })
      .catch((error) => {
        console.error("Error fetching parking slots data: ", error);
      })
    }

    const createNewParkingSlots = () => {
      const newSlotData = {
        available: true,
        employee: false,
        isAvailable: true,
        isEmployee: false,
        parkingLot: {
          parkingLotID: specParkingLot[0].parkingLotID,
          parkingLotName: specParkingLot[0].parkingLotName,
          parkingSlotTotal: specParkingLot[0].parkingSlotTotal,
          parkingSlotAvailable: specParkingLot[0].parkingSlotAvailable
        }
      }

      axios.post('http://localhost:8080/parking-slots', newSlotData)
      .then((response) => {
        console.log("Create a new parking slot", response.data)
        fetchParkingSlotData();
      })
      .catch((error) => {
        console.error("Error creating new parking slot:", error);
      })
      .finally(() => {
        setIs_available(false);
        setAvail_able(false);
        setIs_employee(false);
        setEmp_loyee(false);
        closeModal();
      })
    }

    const openModal = () => {
      setModalOpen(true);
    }

    const closeModal = () => {
      setModalOpen(false);
    }
    
    const handleUpdateParkingSlots = (id, updatedData) => {
      axios.put(`http://localhost:8080/parking-slots/${id}`, updatedData)
        .then((response) => {
          console.log("This slot has been updated!");
          fetchParkingSlotData();
        })
        .catch((error) => {
          console.error("Error updating parking slot: ", error);
    });

    }
    const handleDeleteParkingSlots = (id) => {
      const confirm = window.confirm("Are you sure you want to delete this parking slot?");
      if(confirm){
        axios.delete(`http://localhost:8080/parking-slots/${id}`)
          .then((response) => {
            console.log("A slot has been deleted");
            fetchParkingSlotData();
          })
          .catch((error) => {
            console.error("Error deleting parking slot: ", error);
          })
      }
    }

    const handleToggleAvailability = (prop) => {
      const updatedSlotData = {
        available: !(prop.available),
        employee: prop.employee,
        isAvailable: !(prop.isAvailable),
        isEmployee: prop.isEmployee,
        parkingLot: {
          parkingLotID: prop.parkingLot.parkingLotID,
          parkingLotName: prop.parkingLot.parkingLotName,
          parkingSlotTotal: prop.parkingLot.parkingSlotTotal,
          parkingSlotAvailable: prop.parkingLot.parkingSlotAvailable
        },
        parkingSlotID: prop.parkingSlotID
      }
      handleUpdateParkingSlots(prop.parkingSlotID, updatedSlotData);
    };
  
    const handleToggleEmployee = (prop) => {
      const confirmed = window.confirm("Are you sure you want to change the employee status?");
      if (confirmed) {
        // const updatedData = { isEmployee: !isEmployee, employee: !employee };
        const updatedSlotData = {
          available: prop.available,
          employee: !(prop.employee),
          isAvailable: prop.isAvailable,
          isEmployee: !(prop.isEmployee),
          parkingLot: {
            parkingLotID: prop.parkingLot.parkingLotID,
            parkingLotName: prop.parkingLot.parkingLotName,
            parkingSlotTotal: prop.parkingLot.parkingSlotTotal,
            parkingSlotAvailable: prop.parkingLot.parkingSlotAvailable
          },
          parkingSlotID: prop.parkingSlotID
        }
        handleUpdateParkingSlots(prop.parkingSlotID, updatedSlotData);
      }
    };

    return(<>
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
                      <div className='parking-slot-main-container'>
                      <div className='add-btn'>
                        <button onClick={() => { createNewParkingSlots();}}>Create New Parking Slot</button>
                      </div>

                      <div className='parking-slot-another-container'>
                      {parkingSlots.map((slot, index) => (
                        <div key={slot.parkingSlotID} className="parking-slot-container">
                          <div className='index-num'><p>{index+1}</p></div>
                          <div className={`parking-slot-box ${slot.isEmployee ? 'employee' : 'everyone'}`}>
                            <div className={`circle-div ${slot.isEmployee ? 'emp' : 'ever'} `}> </div>
                            {slot.isEmployee ? 'For Employee' : 'For Everyone'}
                          </div>
                          <div className={`parking-slot-box ${slot.isAvailable ? 'available' : 'occupied'}`}>
                            <div className={`circle-div ${slot.isAvailable ? 'avail' : 'occu'} `}> </div>
                            {slot.isAvailable ? 'Available' : 'Occupied'}
                          </div>
                          <div className="parking-slot-buttons">
                            <button
                              onClick={() => {
                                handleToggleAvailability(slot);
                              }}
                            >
                              Toggle Availability
                            </button>
                            <button
                              onClick={() => {
                                handleToggleEmployee(slot);
                              }}
                            >
                              Toggle Employee
                            </button>
                            <button
                              onClick={() => {
                                handleDeleteParkingSlots(slot.parkingSlotID);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                      </div>
                      </div>
                    </Grid>
                    </div>
                  
                </div>
          </Box>
        </Grid>
      </Grid>
    </div>

    <div>
    </div>
  </>);
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

const Modal = ({ isOpen, onClose, children }) => {
  const modalStyle = {
      display: isOpen ? 'block' : 'none',
  };

  return (
  <div className="modal" style={modalStyle}>
      <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          {children}
      </div>
  </div>
  );
};
