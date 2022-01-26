import {useState} from 'react';
import axios from "axios";

import { Link } from "react-router-dom";

import { 
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography
 } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import OpenIcon from '@mui/icons-material/OpenInNew';
import NewIcon from '@mui/icons-material/FiberNew';

const baseURL = process.env.REACT_APP_DYNAMO_DB_URL

export default function AdminCardActions({ 
  role, 
  article,
  date
}) {

  const [open, setOpen] = useState(false);
  const [openArticle, setOpenArticle] = useState(false);

  const handleDeleteAlert = () => {
    console.log('delete')
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAndDelete = () => {
    setOpen(false);
    axios.delete(baseURL + 'article/' + article.id).then((response) => {
      window.location.reload();
    });
  };

  const handleOpenArticle = () => {
    setOpenArticle(true);
    if(role==='user'){
      article.viewed = true;
      axios.put(baseURL + 'article', article).then((response) => {
        console.log('article updated', response)
      });
    }
  };

  const handleCloseArticle = () => {
    setOpenArticle(false);
  };

  return (
    <>  
      <IconButton onClick={handleOpenArticle}>
        <OpenIcon style={{fill: "#76b900" }}/>
      </IconButton>
      {role==='admin' && <>
        <IconButton 
          component={Link} 
          to={'/edit?articleId=' + article.id}
        >
          <EditIcon style={{fill: "#76b900" }} />
        </IconButton>
        <IconButton onClick={handleDeleteAlert}>
          <DeleteIcon style={{fill: "#76b900" }}/>
        </IconButton>
      </>}
      {role==='user' && !article.viewed && <NewIcon style={{fill: "#76b900" }}/> }
      <Dialog
        open={open}
        onClose={handleClose}
        scroll='paper'
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
      <Dialog
        open={openArticle}
        onClose={handleCloseArticle}
        scroll='paper'
      >
        <DialogContent dividers={true}>
        <Card sx={{ maxWidth: 500, minWidth: 500, height: '100%' }}>
          <CardHeader 
            title={article.title} 
            titleTypographyProps={{ variant: "h5", color: "primary", fontWeight: 900, alignItems: "top" }}
            action={
              <IconButton onClick={handleCloseArticle}>
                <CloseIcon style={{fill: "#76b900" }}/>
              </IconButton>
            }
          />
          <CardMedia
            component="img"
            width="500"
            image= {process.env.REACT_APP_S3_IMAGE_URL + article.image}
          />
          <CardContent>
            <Typography variant="subtitle2" color="primary">{article.description}</Typography>
          </CardContent>
          <CardActions>
            <Typography variant="caption" color="#AAA" sx={{ maxHeight: 30, minHeight: 30 }} m={1}>{date}</Typography>
          </CardActions>
        </Card>
        </DialogContent>
      </Dialog>
    </>
  )
}