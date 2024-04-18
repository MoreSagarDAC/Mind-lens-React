
import React, { useState } from 'react';
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
import './Signup.css'
import { Button, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import axios from 'axios';

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const Signup = () => {
        navigate('/signin')
    }

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:3000/Signup_user', {
                username,
                password,
                mobileNumber
            });
            console.log(response.data); 
            alert('Register SuccessFully');
            navigate('/signin');
        } catch (error) {
            console.error('Error signing up:', error); 
        }
    };

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
                       
                        <FormControl sx={{ marginTop: 2 }} variant="outlined">
                            <TextField
                                id="outlined-basic"
                                label="Mobile Number"
                                variant="outlined"
                                onChange={(e) => setMobileNumber(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end" style={{ paddingLeft: '2px' }}>
                                            <PhoneIcon style={{ fontSize: 30 }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </FormControl>
                        <CardActions className='card-actions'>
                            <Button variant="contained" style={{ width: '261px', height: '40px' }} onClick={handleSignup}>
                                Signup
                            </Button>
                        </CardActions>
                        <Typography style={{ cursor: 'pointer' }} onClick={Signup}>
                            Already User?Click to SignIn.
                        </Typography>
                    </form>

                </CardContent>

            </Card>
        </div>
    );
}
