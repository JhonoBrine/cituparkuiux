
import { Box, Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import '../styleMain/forParkingSlot.css';

export default function GleBldgHPage(){
  const [parkingSlots, setParkingSlots] = useState([{}])
  const [specParkingLot, setSpecParkingLot] = useState([{}])

  const [is_available, setIs_available] = useState(true);
  const [avail_able, setAvail_able] = useState(true);

  const [is_employee, setIs_employee] = useState(false);
  const [emp_loyee, setEmp_loyee] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);

  const [totalAvailable, setTotalAvailable] = useState(0);
	const [total_slot, setTotal_slot] = useState(0);

  {/*Fetched Data for Parking Lots */}

  useEffect(() => {
    fetchParkingSlotData();
    fetchParkingLotData();
  }, []);
  

  const fetchParkingLotData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/parkinglots');
      const temp_slots = response.data;
      const filteredSlots = temp_slots.filter((slot) => slot && slot.parkingLotID === 3);
  
      const totalSlots = filteredSlots.reduce((accumulator, lot) => accumulator + lot.parkingSlotTotal, 0);
      const availableSlots = filteredSlots.reduce((accumulator, lot) => accumulator + lot.parkingSlotAvailable, 0);
  
      setTotalAvailable(availableSlots);
      setTotal_slot(totalSlots);
      setSpecParkingLot(filteredSlots);
  
      console.log("Fetched Data: ", filteredSlots);
    } catch (error) {
      console.error("Error fetching parking data: ", error);
    }
  };

  const fetchParkingSlotData = () => {
    axios.get('http://localhost:8080/parking-slots')
    .then((response) => {
      console.log("Fetched Slot Data: ", response.data);
      const temp_slots = response.data;

    // Filter the parking slots based on parkingLotID === 3
    const filteredSlots = temp_slots.filter(slot => slot.parkingLot && slot.parkingLot.parkingLotID === 3);

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

  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }
  
  return(<>
  <div className="admin-parkingSlotsContainer">
    <Grid container spacing={2} className="customGrid">
      <Grid item xs={12}>
        <Box className="customBox" style={{marginLeft: '5%',outline: '5px solid #f6c301', marginTop: '50px'}}>
          <div className='customSlot-main'>
            <Grid container style={{ backgroundColor: 'gold', width: '1097px', color:'maroon',marginBottom:'10px', marginLeft: "56px", borderRadius: "25px 25px 0 0"}}>
                <div className='slot-Bar'>
                  <ul>
                      <li>TOTAL PARKING SLOT: <span className='slot-count'>{total_slot}</span></li>
											<li>AVAILABLE PARKING SLOTS: <span className='slot-count'>{totalAvailable}</span></li>
											<li>OCCUPIED SLOTS: <span className='slot-count'>{total_slot - totalAvailable}</span></li>
                  </ul>
                </div>
            </Grid>
              <div className='slot-secondary'>
                  <div className='nav-leftMain'>
                    <ul>
                        <CustomLink to="/parkingLotView">ALL</CustomLink>
                        <CustomLink to="/parkingLotView/rtl">RTL BLDG</CustomLink>
                        <CustomLink to="/parkingLotView/nge">NGE BLDG</CustomLink>
                        <CustomLink to="/parkingLotView/gle">GLE BLDG</CustomLink>
                        <CustomLink to="/parkingLotView/backgate">BACK GATE</CustomLink>
                        <CustomLink to="/parkingLotView/library">LIBRARY</CustomLink>

                    </ul>
                  </div>
                  <Grid container className='result' style={{ backgroundColor: '#d9d9d9', width: '80%', height: '550px', marginLeft: '10px'}}>
                    <div className='parking-slot-main-container'>
                    <div className='parking-slot-another-container'>
                    {parkingSlots.map((slot, index) => (
                      <div key={slot.parkingSlotID} className="parking-slot-container">
                        <div className='index-num'><p>{index+1}</p></div>
                        <div className='sign-box'>
                          <div className={`parking-slot-box ${slot.isEmployee ? 'employee' : 'everyone'}`}>
                            <div className={`circle-div ${slot.isEmployee ? 'emp' : 'ever'} `}> </div>
                            {slot.isEmployee ? 'For Employee' : 'For Everyone'}
                          </div>
                          <div className={`parking-slot-box ${slot.isAvailable ? 'available' : 'occupied'}`}>
                            <div className={`circle-div ${slot.isAvailable ? 'avail' : 'occu'} `}> </div>
                            {slot.isAvailable ? 'Available' : 'Occupied'}
                          </div>
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