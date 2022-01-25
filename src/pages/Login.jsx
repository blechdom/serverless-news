import {useState} from 'react';
import axios from "axios";

import {Link} from "react-router-dom";

import { Paper, Button, Grid, TextField, Typography } from '@mui/material';

const baseURL = process.env.REACT_APP_DYNAMO_DB_URL

export default function Login({setRole}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function authenticateEmail() {
    if(email && password) {
      axios.get(baseURL + 'login/' + email)
        .then((response) => {
          console.log('response', response.data)
          //TODO: Make secure, add encryption, and more...
          if(response.data.Item.password === password) {
            setRole(response.data.Item.role)
            window.location.href = '/'
            console.log('response.data.Item.role', response.data.Item.role)
          }
          else {
            alert('Incorrect password')
          }
        })
        .catch(function (error){
          console.log('error in login: ', error)
        });
    }
    else {
      alert('Oops! Missing data in form fields. TODO: Update form validation')
    }
  }

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
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                fullWidth
                color="primary"
                onChange={(e) => setPassword(e.target.value)}
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
              <Button 
                variant="contained" 
                disableElevation 
                style={{backgroundColor: "#76b900"}} 
                onClick={authenticateEmail}
              >
                Login
              </Button>
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