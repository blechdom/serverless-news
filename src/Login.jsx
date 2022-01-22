import {useState} from 'react';
import {Link} from "react-router-dom";

import { Box, Button, Grid, TextField } from '@mui/material';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <h1>Login</h1>
        </Grid>
        <Grid item xs={8}>
          <TextField
            required
            id="outlined-required"
            label="Email"
            fullWidth
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} pt={3}>
        <Grid item xs={4} >
          <Button variant="outlined" component={Link} to={'/'}>Cancel</Button>
        </Grid>
        <Grid item xs={4} >
          <Button variant="contained" disableElevation >Login</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
