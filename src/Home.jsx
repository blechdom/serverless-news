import {useState, useEffect} from 'react';
import axios from "axios";

import { Box, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { Link } from "react-router-dom";

import Article from './Article';

const baseURL = process.env.REACT_APP_DYNAMO_DB_URL

export default function Home() {
  const [role, setRole] = useState('');
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setRole('admin')
    axios.get(baseURL + 'articles').then((response) => {
      console.log('response,', response.data.Items);
      setArticles(response.data.Items);
    });
  }, []);


  if (!articles) return null;

  return (
    <Box>
      <Grid container spacing={3}>
        {role==='admin' && 
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
        }
        <Grid container item xs={12} spacing={3}>
          {articles.map((article) => {
            console.log('article id ', article.id);
            
            return (
              <Grid item xs={4} key={article.id}>
              <Article
                role={'admin'}
                key={article.id}
                article={article}
              />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
}
