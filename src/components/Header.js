import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import logoImage from '../Assets/images.jpg';
import { Link ,useNavigate} from 'react-router-dom';
import './Header.css';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false); 
  const navigate = useNavigate();

  const pages = ['Add Category', 'Add Question'];

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  const logoClick=()=>{
    navigate('/main');
  }
  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const Logout=()=>{
    navigate('/signin');
  }
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box>
            <img src={logoImage} alt='' style={{cursor:'pointer'}} className='logo' onClick={logoClick} />
          </Box>
          <Typography variant='h5' noWrap sx={{ m: 2 ,cursor:'pointer'}} onClick={logoClick}>
            MindLens Assignment
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
            id="menu-icon-button"
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleMenuOpen} // Open the menu when this button is clicked
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={document.getElementById('menu-icon-button')}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={menuOpen} // Pass the state to control menu visibility
              onClose={handleMenuClose} // Close the menu when this event occurs
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleMenuClose}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1, }}>
            <Typography variant='h6' sx={{ display: { xs: 'none', md: 'block' }, }}>
              <Link to="/main/addCategory" style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px' }}>Add Category</Link>
              <Link to="/main/addQuestion" style={{ textDecoration: 'none', color: 'inherit' }}>Add Question</Link>
              
              
            </Typography>
          </Box>
          <Typography style={{marginLeft:'20px',cursor:'pointer'}}>
          
          <Tooltip title="Logout" placement="top-end" >
          <LogoutIcon sx={{ fontSize: 28 }} onClick={Logout}/>
          </Tooltip>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
