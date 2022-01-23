import {useState, useEffect} from 'react';
import axios from "axios";

import { Box, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { Link } from "react-router-dom";

import Article from './Article';

const baseURL = process.env.REACT_APP_DYNAMO_DB_URL;

export default function Admin() {
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(baseURL + 'articles').then((response) => {
      console.log('response,', response.data);
      setPost(response.data);
    });
  }, []);

  if (!post) return null;

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button 
            variant="contained" 
            size="large" 
            disableElevation 
            startIcon={<AddIcon />} 
            sx={{ backgroundColor: "#76b900" }}
            component={Link} 
            to={'/edit'}
          >
            New Article
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Article admin={true}/>
        </Grid>
      </Grid>
      <p>{post.Count}</p>
    </Box>
  );
}
