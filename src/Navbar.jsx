import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { 
  AppBar,
  Toolbar,
  Typography,
  Button 
} from '@mui/material';

export default function Navbar({getRole}) {

  const [role, setRole] = useState('');

  useEffect(() => {
    setRole(getRole())
  }, []);

  function handleLogout() {
    sessionStorage.setItem('role', '');
    setRole(getRole())
    window.location.href = '/'
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Button
          key='home'
          component={Link} 
          to={'/'}
          sx={{ my: 2, color: 'white', display: 'block', flex: 1 }}
        >
          <Typography variant='h6' type="title" >
            NEWS
          </Typography>
        </Button>
        {!role ?
        <Button
          key='login'
          component={Link} 
          to={'/login'}
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          Login
        </Button> :
        <Button
        key='logout'
        sx={{ my: 2, color: 'white', display: 'block' }}
        onClick={handleLogout}
      >
        Logout
      </Button> 
}
      </Toolbar>
    </AppBar>
  );
}