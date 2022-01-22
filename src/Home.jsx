import {useState, useEffect} from 'react';
import axios from "axios";

import { Box, Button, Grid, TextField } from '@mui/material';

import Article from './Article';

const baseURL = "https://04t3hc180d.execute-api.us-west-2.amazonaws.com/items";

export default function Home() {
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      console.log('response,', response.data);
      setPost(response.data);
    });
  }, []);

  if (!post) return null;

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <h1>Articles</h1>
        </Grid>
        <Grid item xs={12}>
          <Article />
        </Grid>
      </Grid>
      <p>{post.Count}</p>
    </Box>
  );
}
