import {useState} from 'react';
import {Link} from "react-router-dom";

import { Paper, Button, Grid, TextField, Typography } from '@mui/material';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
      <Grid container alignItems="center"
      justifyContent="center" pt={3}>
        <Grid item xs={8}>
          <Paper>
            <Grid 
              container 
              spacing={4} 
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={8}>
                <Typography 
                  variant='h4' 
                  color='primary'
                  fontWeight='900'
                >
                  Login
                </Typography>
              </Grid>
            <Grid item xs={8}>
              <TextField
                id="outlined-basic"
                label="Email"
                fullWidth
                color="primary"
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                fullWidth
                color="primary"
              />
            </Grid>
          </Grid>
          <Grid 
              container 
              spacing={3} 
              alignItems="center"
              justifyContent="center"
              pt={4}
              pb={4}
            >
            <Grid item xs={4} >
              <Button variant="contained" disableElevation style={{backgroundColor: "#76b900"}} >Login</Button>
            </Grid>
            <Grid item xs={4} >
              <Button variant="outlined" component={Link} to={'/'}>Cancel</Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
 
  );
}
