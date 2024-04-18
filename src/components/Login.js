import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import logoImage from '../Assets/images.jpg';
import Box from '@mui/material/Box';
import './Login.css'
import { Button, Typography } from '@mui/material';
import axios from 'axios';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Signup_user');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  const handleLogin = () => {
    const isValidUser = checkCredentials(username, password);

    if (isValidUser) {
      alert('Login successful!');
      navigate('/main');
    } else {

      alert('Invalid username or password. Please try again or sign up.');  
      setError('Invalid username or password. Please sign up.');
    }
  };
  const checkCredentials = (username, password) => {
    const foundUser = userData.find((user) => user.username === username && user.password === password);
    return !!foundUser;
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const Signup = () => {
    navigate('/signup')
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'rgb(30, 82, 84) ' }}>
      <Card className='login-card'>
        <Box>
          <img src={logoImage} alt='' style={{ cursor: 'pointer', width: '90px', height: '90px', marginBottom: '10px' }} />
        </Box>
        <CardContent>
          <form>
            <FormControl variant="outlined" >
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" style={{ paddingLeft: '2px' }}>
                      <AccountCircle style={{ fontSize: 30 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl sx={{ marginTop: 2 }} variant="outlined">
              <TextField
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff style={{ fontSize: 30 }} /> : <Visibility style={{ fontSize: 28 }} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <CardActions className='card-actions'>
              <Button variant="contained" style={{ width: '261px', height: '40px' }} onClick={handleLogin}>
                SignIn
              </Button>
            </CardActions>
            <Typography style={{ cursor: 'pointer' }} onClick={Signup}>
              New User?Click to Signup.
            </Typography>
          </form>

        </CardContent>

      </Card>
    </div>
  );
}
