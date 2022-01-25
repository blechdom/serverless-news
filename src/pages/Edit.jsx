import { useEffect, useState } from 'react';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk'

import {Link, useLocation, useNavigate} from "react-router-dom";

import { 
  Paper, 
  Button, 
  Grid, 
  InputAdornment, 
  TextField, 
  Typography
} from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';
import ImageIcon from '@mui/icons-material/AddPhotoAlternate';

const S3_BUCKET = process.env.REACT_APP_S3_BUCKET_NAME
const REGION = process.env.REACT_APP_S3_BUCKET_REGION

AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
})

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET},
  region: REGION,
})

const baseURL = process.env.REACT_APP_DYNAMO_DB_URL

export default function Edit() {

  const location = useLocation();
  let navigate = useNavigate();

  const [id, setId] = useState('');
  const [articleId, setArticleId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loadingState, setLoadingState] = useState(false);
  const [progress , setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState('');
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setArticleId(queryParams.get('articleId'));
  }, [location.search])

  useEffect(() => {
    if(articleId){
      axios.get(baseURL + 'article/' + articleId).then((response) => {
        setId(response.data.Item.id);
        setTitle(response.data.Item.title);
        setDescription(response.data.Item.description);
        setImage(response.data.Item.image);
        setImageUrl(process.env.REACT_APP_S3_IMAGE_URL + response.data.Item.image)
      })
    }
    else{
      setId(uuidv4());
    }
  }, [articleId])

  useEffect (() => {
    if(title && description && selectedFile && image) {
      uploadFile();   
    }
  }, [title, image, description, selectedFile])

  function uploadFileAndSubmit() {
    if(title && description && selectedFile) {
      setImage(selectedFile.name);
    }
    else if (title && description && image) {
      updateArticle();
    }
    else {
      alert('Oops! Missing data in form fields. TODO: Update form validation')
    }
  }

  function uploadFile () {
    const params = {
      ACL: 'public-read',
      Body: selectedFile,
      Bucket: S3_BUCKET,
      Key: image
    };
    myBucket.putObject(params)
      .on('httpUploadProgress', (evt) => {
        setLoadingState(true)
        setProgress(Math.round((evt.loaded / evt.total) * 100))
      })
      .on('success', (response) => {
        setLoadingState(false)
        updateArticle();
      })
      .send((err) => {
        if (err) console.log(err)
      })
  }

  function updateArticle() {
    const editData = {
      id,
      title,
      description,
      image,
      viewed: false,
      date: Math.round(Date.now() / 1000)
    }
    axios.put(baseURL + 'article', editData).then(() => {
      navigate('/');
    });
  }//add for trigger
 
  return (
      <Grid container alignItems="center"
      justifyContent="center" pt={3}>
        <Grid item xs={8}>
          <Paper>
            <Grid 
              container 
              spacing={4} 
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={8}>
                <Typography 
                  variant='h4' 
                  color='primary'
                  fontWeight='900'
                >{articleId ? 'Edit' : 'New'} article
                </Typography>
              </Grid>
            <Grid item xs={8}>
              <TextField
                id="outlined-basic"
                label="Title"
                fullWidth
                color="primary"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                fullWidth
                color="primary"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid 
              container 
              item 
              xs={8} 
              spacing={4} 
              alignItems="center"
            >
              <Grid item xs={2} mr={2}>
                {imageUrl ? <img src={imageUrl} width='100' alt='upload preview' /> : <ImageIcon fontSize="large" color="primary"/>}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Image"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])}/>
                      </InputAdornment>
                    )
                  }}
                  fullWidth
                  disabled
                  color="primary"
                />
              </Grid>
             </Grid>     
            </Grid>
          <Grid 
            container 
            spacing={3} 
            alignItems="center"
            justifyContent="center"
            pt={4}
            pb={4}
          >
            <Grid item xs={4} >
              <LoadingButton 
                variant="contained" 
                disableElevation 
                loading = {loadingState}
                loadingIndicator={progress + '%'}
                sx={{backgroundColor: "#76b900"}} 
                onClick={uploadFileAndSubmit}
              >Submit</LoadingButton>
            </Grid>
            <Grid item xs={4} >
              <Button variant="outlined" component={Link} to={'/'}>Cancel</Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid> 
  );
}
