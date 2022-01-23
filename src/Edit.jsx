import {useEffect, useState} from 'react';

import AWS from 'aws-sdk'

import {Link, useLocation} from "react-router-dom";

import { Paper, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material';
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

export default function Edit() {

  const location = useLocation();

  const [params, setParams] = useState(null);
  const [articleId, setArticleId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageTitle, setImageTitle] = useState('');
  const [loadingState, setLoadingState] = useState(false);
  const [progress , setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setArticleId(queryParams.get('articleId'));
  }, [])
  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
}

const uploadFile = (file) => {

  const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name
  };

  myBucket.putObject(params)
      .on('httpUploadProgress', (evt) => {
          setLoadingState(true)
          setProgress(Math.round((evt.loaded / evt.total) * 100))
          console.log('evt', evt)
      })
      .on('success', (response) => {
        setLoadingState(false)
      })
      .send((err) => {
          if (err) console.log(err)
      })
  }

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
              />
            </Grid>
            <Grid container item spacing={4} 
              alignItems="center"
              justifyContent="center">
              <Grid item xs={1}>
                <ImageIcon fontSize="large" color="primary"/>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  label="Image"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <input type="file" onChange={handleFileInput}/>
                      </InputAdornment>
                    )
                  }}
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
                onClick={() => uploadFile(selectedFile)}
              >Submit</LoadingButton>
            </Grid>
            <Grid item xs={4} >
              <Button variant="outlined" component={Link} to={'/admin'}>Cancel</Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
 
  );
}
