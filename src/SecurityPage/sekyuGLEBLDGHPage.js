import { Box, Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import './sekyuCss/sekyuParkingLotView.css';

export default function sekyuGleBldgHPage(){

  const numberLot = 5;
	const [parkingSlots, setParkingSlots] = useState([{}])
	const [specParkingLot, setSpecParkingLot] = useState([{}])

	const [is_available, setIs_available] = useState(true);
	const [avail_able, setAvail_able] = useState(true);

	const [is_employee, setIs_employee] = useState(false);
	const [emp_loyee, setEmp_loyee] = useState(false);

	const [totalAvailable, setTotalAvailable] = useState(0);
	const [total_slot, setTotal_slot] = useState(0);

	const [createNewCount, setCreatenewCount] = useState(0);

	{/*Fetched Data for Parking Lots */}

	useEffect(() => {
		fetchParkingSlotData();
		fetchParkingLotData();
	}, []);
	

	const fetchParkingLotData = async () => {
		try {
			const response = await axios.get('http://localhost:8080/parkinglots');
			const temp_slots = response.data;
			const filteredSlots = temp_slots.filter((slot) => slot && slot.parkingLotID === numberLot);
	
			const totalAvailableSlots = await calculateAvailableSlots(filteredSlots);

			console.log("Available Slots: ", totalAvailableSlots)

			const totalSlots = filteredSlots.reduce((accumulator, lot) => accumulator + lot.parkingSlotTotal, 0);

			setTotalAvailable(totalAvailableSlots);
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

		const filteredSlots = temp_slots.filter(slot => slot.parkingLot && slot.parkingLot.parkingLotID === numberLot);

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

	const calculateAvailableSlots = async (parkingLots) => {
		console.log(parkingLots);
		const responses = await Promise.all(
			parkingLots.map(async (lot) => {
				try {
					return await axios.get(`http://localhost:8080/parkinglots/available-slots/${lot.parkingLotID}`);
				} catch (error) {
					console.error("Error fetching available slot data: ", error);
				}
			})
		);
	
		const totalAvailableSlots = responses.reduce((accumulator, response) => {
			return accumulator + response.data.length;
		}, 0);
		console.log("totalAvailableSlot in calculateAvailableSlots: ", totalAvailableSlots)
		return totalAvailableSlots;
	};

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
			fetchParkingLotData();
			setTotal_slot(total_slot => total_slot +1);
		})
		.catch((error) => {
			console.error("Error creating new parking slot:", error);
		})
		.finally(() => {
			setIs_available(false);
			setAvail_able(false);
			setIs_employee(false);
			setEmp_loyee(false);
		})
	}

	const handleUpdateParkingSlots = (id, updatedData) => {
		const {parkingLot} = updatedData;
		const {parkingLotID, parkingLotName, parkingSlotTotal, parkingSlotAvailable} = parkingLot;
		axios.put(`http://localhost:8080/parking-slots/${id}`, updatedData)
			.then((response) => {
				console.log("This slot has been updated!", response.data);

				const updateSlotData = {
					parkingLotName: parkingLotName,
					parkingSlotTotal: parkingSlotTotal || 0,
					parkingSlotAvailable: parkingSlotAvailable || 0,
				}

				console.log("parkingSlotAvailable in handleUpdate", parkingSlotAvailable)

				console.log("parkingLotID: ", parkingLotID)

				axios.put(`http://localhost:8080/parkinglots/${parkingLotID}`, updateSlotData)
					.then((response) => {
							console.log("This lot has been updated!", response.data)
					})
					.catch((error) => {
						console.error("Error updating parking lot: ", error)
					})

				fetchParkingSlotData();
				// fetchParkingLotData();
			})
			.catch((error) => {
				console.error("Error updating parking slot: ", error);
			})
	}

	const handleDeleteParkingSlots = (id) => {
		const confirm = window.confirm("Are you sure you want to delete this parking slot?");
		if(confirm){
			axios.delete(`http://localhost:8080/parking-slots/${id}`)
				.then((response) => {
					console.log("A slot has been deleted");
					fetchParkingLotData();
					fetchParkingSlotData();

					setTotal_slot(total_slot => total_slot - 1);
				})
				.catch((error) => {
					console.error("Error deleting parking slot: ", error);
				})
		}
	}

	const handleToggleAvailability = (prop) => {
  const { available, employee, parkingLot, parkingSlotID, isEmployee } = prop;
  const { parkingLotID, parkingLotName, parkingSlotTotal, parkingSlotAvailable } = parkingLot;

  const isAvailable = !(available);

  axios.get(`http://localhost:8080/parkinglots/available-slots/${parkingLotID}`)
    .then((response) => {
      console.log(response.data.length);

      const updatedSlotData = {
        available: isAvailable,
        employee: employee,
        isAvailable: isAvailable,
        isEmployee: isEmployee,
        parkingLot: {
          parkingLotID: parkingLotID,
          parkingLotName: parkingLotName,
          parkingSlotTotal: parkingSlotTotal,
          parkingSlotAvailable: response.data.length,
        },
        parkingSlotID: parkingSlotID,
      };
			const updatedTotalAvailable = isAvailable ? response.data.length + 1 : response.data.length - 1;

      handleUpdateParkingSlots(parkingSlotID, updatedSlotData);
      setTotalAvailable(updatedTotalAvailable);
      setTotal_slot(parkingSlotTotal);
    })
    .catch((error) => {
      console.error("Error getting available slots: ", error);
    });
};


	const handleToggleEmployee = (prop) => {

		const {available, employee, parkingLot, parkingSlotID, isAvailable} = prop;
		const {parkingLotID, parkingLotName, parkingSlotTotal, parkingSlotAvailable} = parkingLot;

		const isEmployee = !(employee);
		const updatedEmployee = isEmployee
					? true : false;

		const confirmed = window.confirm("Are you sure you want to change the user type status?");
		if (confirmed) {
			// const updatedData = { isEmployee: !isEmployee, employee: !employee };
			const updatedSlotData = {
				available: available,
				employee: updatedEmployee,
				isAvailable: isAvailable,
				isEmployee: updatedEmployee,
				parkingLot: {
					parkingLotID: parkingLotID,
					parkingLotName: parkingLotName,
					parkingSlotTotal: parkingSlotTotal,
					parkingSlotAvailable: parkingSlotAvailable
				},
				parkingSlotID: parkingSlotID
			}
			
		handleUpdateParkingSlots(parkingSlotID, updatedSlotData);
		// setTotalAvailable(parkingSlotAvailable);
		// setTotal_slot(parkingSlotTotal);
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
											<li>TOTAL PARKING SLOT: <span className='slot-count'>{total_slot}</span></li>
											<li>AVAILABLE PARKING SLOTS: <span className='slot-count'>{totalAvailable}</span></li>
											<li>OCCUPIED SLOTS: <span className='slot-count'>{total_slot - totalAvailable}</span></li>
									</ul>
								</div>
						</Grid>
							<div className='slot-secondary'>
									<div className='nav-leftMain'>
										<ul>
										  <CustomLink to="/sekyu">ALL</CustomLink>
                      <CustomLink to="/sekyu/rtl">RTL BLDG</CustomLink>
                      <CustomLink to="/sekyu/nge">NGE BLDG</CustomLink>
                      <CustomLink to="/sekyu/gle">GLE BLDG</CustomLink>
                      <CustomLink to="/sekyu/backgate">BACK GATE</CustomLink>
                      <CustomLink to="/sekyu/library">LIBRARY</CustomLink>

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
