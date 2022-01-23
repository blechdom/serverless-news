import { Link } from "react-router-dom";

import { 
  AppBar,
  Toolbar,
  Typography,
  Button 
} from '@mui/material';

export default function Navbar() {

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
          <Button
            key='login'
            component={Link} 
            to={'/login'}
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
  );
}