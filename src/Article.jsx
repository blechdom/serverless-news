import {useEffect, useState} from 'react';

import { 
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography
 } from '@mui/material';

import AdminCardActions from './AdminCardActions';

export default function Article({role, article}) {
  const [articleDate, setArticleDate] = useState(0);

  useEffect(() => {
    let d = new Date(0); 
    d.setUTCSeconds(article.date);
    setArticleDate(d.toDateString().split(' ').slice(1).join(' '));  
  }, [article.date]);

  return (
    <>
    <Card sx={{ maxWidth: 345, minWidth: 345, maxHeight: 450, minHeight: 450}}>
      <CardHeader 
        title={article.title} 
        titleTypographyProps={{ variant: "h5", color: "primary", fontWeight: 900, alignItems: "top" }}
        action={
          <AdminCardActions 
            viewed={false}
            articleId={article.id} 
            role={role} 
            title={article.title}
            description={article.description}
            image={article.image}
            date={articleDate}
          />}
        sx={{ maxHeight: 80, minHeight: 80 }}
      />
      <CardMedia
        component="img"
        height="180"
        image= {process.env.REACT_APP_S3_IMAGE_URL + article.image}
      />
      <CardContent>
        <Typography variant="subtitle2" color="primary" sx={{ maxHeight: 85, minHeight: 85, overflow: "hidden", textOverflow: "ellipsis"}}>{article.description}</Typography>
      </CardContent>
      <CardActions>
        <Typography variant="caption" color="#AAA" sx={{ maxHeight: 30, minHeight: 30 }} m={1}>{articleDate}</Typography>
      </CardActions>
    </Card>
    </>
  );
}