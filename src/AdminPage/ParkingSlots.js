import { Box, Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import './styleAdmMain/AdminStyle.css';

const ParkingSlots = () => {
	
	const [parkingLots, setParkingLots] = useState([{}]);
	const [slotAvailableCounts, setSlotAvailableCounts] = useState({});
	const [totalSlot, setTotalSlot] = useState({});

	const [slotName, setSlotName] = useState([
		"",
		"RTL BLDG",
		"NGE BLDG",
		"GLE BLDG",
		"BACK GATE",
		"LIBRARY",
	])

	const [totalAvailable, setTotalAvailable] = useState(0);
	const [total_slot, setTotal_slot] = useState(0);



	useEffect(() => {
		fetchParkingLotData();
		fetchParkingSlotData();
	}, []);

	const fetchParkingLotData = async () => {
		try {
			const response = await axios.get('http://localhost:8080/parkinglots')
			const parkLotData = response.data;

			setParkingLots(parkLotData);
			console.log("Fetched Data: ", parkLotData);

			//it calculates the available slots after fetching parking lot data
			await calculateAvailableSlots(parkLotData);

			//This calculates the sum of all parkingSlotTotal and parkingSlotAvailable
			const totalSlots = parkLotData.reduce((accumulator, lot) => accumulator + lot.parkingSlotTotal, 0);
			const availableSlots = parkLotData.reduce((accumulator, lot) => accumulator + lot.parkingSlotAvailable, 0);

			//stores the variables above into this state
			setTotalAvailable(availableSlots);
			setTotal_slot(totalSlots);
		} catch (error) {
			console.error("Error fetching parking data: ", error)
		}
	}

// It calculates the available slots by fetching the parkinglots

const calculateAvailableSlots = async (parkingLots) => {
	const counts = {};
	const promises = parkingLots.map(async (lot) => {
		try {
			const response = await axios.get(`http://localhost:8080/parkinglots/available-slots/${lot.parkingLotID}`);
			counts[lot.parkingLotID] = response.data.length;
		} catch (error) {
			console.error("Error fetching available slot data: ", error);
		}
	});

	await Promise.all(promises);
	setSlotAvailableCounts({ ...counts });
};

// Used as a way to get the total Slots of each parking Lot
const fetchParkingSlotData = () => {
	axios.get('http://localhost:8080/parking-slots')
		.then((response) => {
			console.log("Fetched Slot Data: ", response.data);
			const temp_slots = response.data;


			const totalSlotsCounts = {};
			temp_slots.forEach((slot) => {
				const lotID = slot.parkingLot.parkingLotID;
				totalSlotsCounts[lotID] = (totalSlotsCounts[lotID] || 0) + 1;
			});

			setTotalSlot((prevCounts) => ({
				...prevCounts,
				...totalSlotsCounts,
			}));
		})
		.catch((error) => {
			console.error("Error fetching parking slots data: ", error);
		})
	}

	const updateParkingLotData = (id) => {

		const updateData = {
			parkingLotName: slotName[id],
			parkingSlotTotal: totalSlot[id] || 0,
			parkingSlotAvailable: slotAvailableCounts[id] || 0,

		}
		axios.put(`http://localhost:8080/parkinglots/${id}`, updateData)
		.then((response) => {
			console.log("Update Data ", response.data);
		})
		.catch((error) => {
			console.error("Error fetching parking data: ", error);
		})
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
											<li>TOTAL PARKING SLOT: <span className='slot-count'>{total_slot}</span></li>
											<li>AVAILABLE PARKING SLOTS: <span className='slot-count'>{totalAvailable}</span></li>
											<li>OCCUPIED SLOTS: <span className='slot-count'>{total_slot - totalAvailable}</span></li>
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
														<p>Occupied: <span style={{ color: "red" }}>{totalSlot[parkingLot.parkingLotID] - (slotAvailableCounts[parkingLot.parkingLotID] || 0)}</span></p>
														<p>Total Slots: <span style={{ color: "blue" }}>{totalSlot[parkingLot.parkingLotID] || 0}</span></p>

															{/* This updates the  over all parkingSlotTotal, and parkingSlotAvailable*/}
															{updateParkingLotData(parkingLot.parkingLotID)}
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
