import {useEffect, useState} from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

import AdminCardActions from './AdminCardActions';

export default function Article({role, article}) {
  const [adminActions, setAdminActions] = useState();
  const [articleDate, setArticleDate] = useState(0);

  useEffect(() => {
    setAdminActions(role==='admin' ? <AdminCardActions article={article} />: null);
    let d = new Date(0); 
    d.setUTCSeconds(article.date);
    console.log('new date ', d.toDateString());// The 0 there is the key, which sets the date to the epoch
    setArticleDate(d.toDateString().split(' ').slice(1).join(' '));  
  }, []);

  return (
    <Card sx={{ maxWidth: 345 }}>
      
      <CardHeader 
        title={article.title} 
        titleTypographyProps={{ variant: "h5", color: "primary", fontWeight: 900 }}
        action={adminActions}
      />
      <CardMedia
        component="img"
        height="194"
        image= {process.env.REACT_APP_S3_IMAGE_URL + article.image}
      />
      <CardContent>
        <Typography variant="subtitle2" color="primary">{article.description}</Typography>
      </CardContent>
      <CardActions>
        <Typography variant="caption" color="#AAA" m={1}>{articleDate}</Typography>
      </CardActions>
    </Card>
  );
}