import {useState} from 'react';
import axios from "axios";

import { Link } from "react-router-dom";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const baseURL = process.env.REACT_APP_DYNAMO_DB_URL

export default function AdminCardActions({ article }) {
  const [open, setOpen] = useState(false);

  const handleDeleteAlert = () => {
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

  return (
    <>
      <IconButton 
        component={Link} 
        to={'/edit?articleId=' + article.id}
      >
        <EditIcon style={{fill: "#76b900" }} />
      </IconButton>
      <IconButton onClick={handleDeleteAlert}>
        <DeleteIcon style={{fill: "#76b900" }}/>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
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