import {useState, useEffect} from 'react';
import axios from "axios";

import { Box, Grid } from '@mui/material';

import Article from './Article';

const baseURL = process.env.REACT_APP_DYNAMO_DB_URL

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get(baseURL + 'articles').then((response) => {
      console.log('response,', response.data.Items);
      setArticles(response.data.Items);
    });
  }, []);

  if (!articles) return null;

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {articles.map((article) => {
            return (
              <Article
                admin={false}
                key={article.id}
                article={article}
              />
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
}
