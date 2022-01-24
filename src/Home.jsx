import {useState, useEffect} from 'react';
import axios from "axios";

import { Box, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { Link } from "react-router-dom";

import Article from './Article';

const baseURL = process.env.REACT_APP_DYNAMO_DB_URL

export default function Home({getRole}) {
  const [articles, setArticles] = useState([]);
  const [role, setRole] = useState('');

  useEffect(() => {
    setRole(getRole())
    axios.get(baseURL + 'articles').then((response) => {
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
            return (
              <Grid 
                item 
                xs={12} 
                sm={12} 
                md={6} 
                lg={4} 
                xl={3} 
                key={article.id} 
              >
              <Article
                role={role}
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
