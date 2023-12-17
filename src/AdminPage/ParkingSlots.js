import { Box, Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import './styleAdmMain/AdminStyle.css';

const ParkingSlots = () => {
  
  const [parkingLots, setParkingLots] = useState([{}]);
  const [slotAvailableCounts, setSlotAvailableCounts] = useState({});


  useEffect(() => {
    fetchParkingLotData();
    // isAvailableSlots(4);
  }, []);

{/*Fetched Data for Parking Lots */}

const fetchParkingLotData = () => {
  axios.get('http://localhost:8080/parkinglots')
    .then((response) => {
      setParkingLots(response.data);
      console.log("Fetched Data: ", response.data);
      calculateAvailableSlots(response.data);
    })
    .catch((error) => {
      console.error("Error fetching parking data: ", error);
    })
}

const calculateAvailableSlots = (parkingLots) => {
  const counts = {};
  parkingLots.forEach((lot) => {
    axios.get(`http://localhost:8080/parkinglots/available-slots/${lot.parkingLotID}`)
      .then((response) => {
        console.log("Fetch Available Slot Data: ", response.data)
        counts[lot.parkingLotID] = response.data.length;
        setSlotAvailableCounts({ ...counts });
      })
      .catch((error) => {
        console.error("Error fetching available slot data: ", error);
      });
  });
}

    const parkingLotView_btn = (id) => {
      switch(id){
        case 1:
          return <Link to={'/admin/parking-slots/rtl'}><button>VIEW</button></Link>
        case 2:
          return <Link to={'/admin/parking-slots/nge'}><button>VIEW</button></Link>
        case 3:
          return <Link to={'/admin/parking-slots/gle'}><button>VIEW</button></Link>
        case 4:
          return <Link to={'/admin/parking-slots/backgate'}><button>VIEW</button></Link>
        case 5:
          return <Link to={'/admin/parking-slots/library'}><button>VIEW</button></Link>
        default:
          return null;
      }

  }
  
  return (
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
                      <div className='bldg-container'>
                        {parkingLots.map(parkingLot => (
                          <div key={parkingLot.parkingLotID} className='rtl-container'>
                            <p>{parkingLot.parkingLotName}</p>
                            <div className='rtl-box'>
                            <p>Available: <span style={{ color: "green" }}>{slotAvailableCounts[parkingLot.parkingLotID] || 0}</span></p>
                            <p>Occupied: <span style={{ color: "red" }}>{parkingLot.parkingSlotTotal - (slotAvailableCounts[parkingLot.parkingLotID] || 0)}</span></p>
                            <p>Total Slots: <span style={{ color: "blue" }}>{parkingLot.parkingSlotTotal}</span></p>

                              {parkingLotView_btn(parkingLot.parkingLotID)}
                            </div>
                          </div>))}
                      </div>
                    </Grid>
                    </div>
                  
                </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
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

export default ParkingSlots;
