import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Button, Alert } from '@mui/material'; // Import Alert from MUI
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: '#000',
  border: '2px solid #ff0000',
  borderRadius: '8px',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#cc0000',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#ff0000',
  },
}));

const SearchBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#f8f8f8',
  padding: theme.spacing(3),
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
}));

export default function Search() {
  const [checkInDate, setCheckInDate] = React.useState(dayjs());
  const [checkOutDate, setCheckOutDate] = React.useState(dayjs().add(1, 'day'));
  const [options, setOptions] = React.useState([]);
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [numberOfRooms, setNumberOfRooms] = React.useState(1);
  const [numberOfAdults, setNumberOfAdults] = React.useState(1);
  const [numberOfChildren, setNumberOfChildren] = React.useState(0);
  const [alertMsg, setAlertMsg] = React.useState('');
  const [alertType, setAlertType] = React.useState('');
  const [showAlert, setShowAlert] = React.useState(false);
  const navigate = useNavigate();

  const fetchLocations = async (inputValue) => {
    if (!inputValue) return;

    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: inputValue,
          format: 'json',
          addressdetails: 1,
          limit: 50,
        },
      });

      setOptions(response.data.map(location => ({
        label: location.display_name,
      })));
    } catch (error) {
      setAlertType('error');
      setAlertMsg("Could not fetch locations. Please try again later.");
      setShowAlert(true);
      // Hide alert after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  const handleSearch = async () => {
    if (!selectedLocation) {
      setAlertType('error');
      setAlertMsg("Please select a location.");
      setShowAlert(true);
      // Hide alert after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return;
    }

    const searchParams = {
      address: selectedLocation.label,
      checkInDate: checkInDate.format('YYYY-MM-DD'),
      checkOutDate: checkOutDate.format('YYYY-MM-DD'),
      numberOfRooms,
      numberOfAdults,
      numberOfChildren,
    };

    const token = localStorage.getItem('token');

    try {
      const response = await axios.get('http://localhost:8080/api/user/searchHotel', {
        params: searchParams,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.data || response.data.length === 0) {
        setAlertType('warning');
        setAlertMsg("No hotels found. Please try different search criteria.");
        setShowAlert(true);
        // Hide alert after 3 seconds
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        return;
      }

      navigate('/hotelListings', { 
        state: {
          hotels: response.data,
          checkInDate: checkInDate.format('YYYY-MM-DD'),
          checkOutDate: checkOutDate.format('YYYY-MM-DD'),
          numberOfRooms,
          numberOfAdults,
          numberOfChildren,
          hotelLocation: selectedLocation.label,
        }
      });
    } catch (error) {
      setAlertType('error');
      setAlertMsg("Error searching for hotels. Please try again later.");
      setShowAlert(true);
      // Hide alert after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SearchBox sx={{ width: '100%' }}>
        {showAlert && (
          <div
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              zIndex: 1000,
              width: "320px",
            }}
          >
            <Alert severity={alertType}>{alertMsg}</Alert>
          </div>
        )}

        <center>
          <p style={{ color: '#000', fontWeight: 'bold', fontSize: '3.0rem' }}>
            Find places to stay on Cozy Haven Stay
          </p>
          <p style={{ color: '#000', fontWeight: 'normal', fontSize: '2.0rem', marginTop: '-10px' }}>
            Discover entire hotels and rooms perfect for any trip.
          </p>
        </center>
        <Box sx={{ mt: 3 }}>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <Item>
                <Autocomplete
                  options={options}
                  getOptionLabel={(option) => option.label}
                  onInputChange={(event, value) => fetchLocations(value)}
                  onChange={(event, value) => setSelectedLocation(value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Location" placeholder="Enter location" fullWidth />
                  )}
                />
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <Box sx={{ width: '100%' }}>
                  <DatePicker
                    label="Check In Date"
                    value={checkInDate}
                    onChange={(newValue) => setCheckInDate(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth placeholder="Select check-in date" />
                    )}
                  />
                </Box>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <Box sx={{ width: '100%' }}>
                  <DatePicker
                    label="Check Out Date"
                    value={checkOutDate}
                    onChange={(newValue) => setCheckOutDate(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth placeholder="Select check-out date" />
                    )}
                  />
                </Box>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <TextField
                  label="Number of Rooms"
                  type="number"
                  value={numberOfRooms}
                  onChange={(e) => setNumberOfRooms(e.target.value)}
                  fullWidth
                  InputProps={{ inputProps: { min: 1 } }}
                />
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <TextField
                  label="Number of Adults"
                  type="number"
                  value={numberOfAdults}
                  onChange={(e) => setNumberOfAdults(e.target.value)}
                  fullWidth
                  InputProps={{ inputProps: { min: 1 } }}
                />
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <TextField
                  label="Number of Children"
                  type="number"
                  value={numberOfChildren}
                  onChange={(e) => setNumberOfChildren(e.target.value)}
                  fullWidth
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Item>
            </Grid>
            <Grid item xs={12}>
              <StyledButton fullWidth onClick={handleSearch}>
                Search
              </StyledButton>
            </Grid>
          </Grid>
        </Box>
      </SearchBox>
    </LocalizationProvider>
  );
}
