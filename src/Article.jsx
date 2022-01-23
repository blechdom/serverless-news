import {useEffect, useState} from 'react';

import { Link } from "react-router-dom";

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import { usePreviousProps } from '@mui/utils';

function AdminCardActions(props) {
  const [open, setOpen] = useState(false);

  const handleDeleteAlert = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAndDelete = () => {
    setOpen(false);
    console.log('delete article and image');
  };

  return (
    <>
      <IconButton 
        component={Link} 
        to={'/edit?articleId=1234'}
      >
        <EditIcon style={{fill: "#76b900" }} />
      </IconButton>
      <IconButton onClick={handleDeleteAlert}>
        <DeleteIcon style={{fill: "#76b900" }}/>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Deleting Article"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone. Are you sure you want to delete this article?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCloseAndDelete} autoFocus>
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default function Article({admin, article}) {
  const [adminActions, setAdminActions] = useState();
  const [articleDate, setArticleDate] = useState(0);

  useEffect(() => {
    setAdminActions(admin ? <AdminCardActions/>: null);
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