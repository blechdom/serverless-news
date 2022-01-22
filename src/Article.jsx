import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

export default function Article(props) {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title="Shrimp and Chorizo Paella" />
      <CardMedia
        component="img"
        height="194"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjWrDQw9UlIXLcIrXWmsXxKX8HQkHgz0Wj2A&usqp=CAU"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Typography paragraph>
          December 24, 2021
        </Typography>
      </CardActions>
    </Card>
  );
}