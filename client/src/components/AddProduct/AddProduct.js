import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TopBar from '../TopBar'

import AddCurrency from './SelectCurrency'
import '../../css/AddProduct.css'
import Location from '../Location';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddProduct() {
  const classes = useStyles();
  const [userData, setUserData] = useState({})

  return (
    <div className='add_product-wr'>
      <TopBar />

      <div className="add_product-form">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="title"
                    autoFocus
                    label="Titlul Anuntului"
                    name="title"
                    onChange={e => setUserData({ ...userData, [e.target.name]: e.target.value })}
                    autoComplete="title"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="description"
                    label="Decrierea Anuntului"
                    name="description"
                    onChange={e => setUserData({ ...userData, [e.target.name]: e.target.value })}
                    autoComplete="description"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="price"
                    label="Pret"
                    name="price"
                    onChange={e => setUserData({ ...userData, [e.target.name]: e.target.value })}
                    autoComplete="price"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    onChange={e => setUserData({ ...userData, [e.target.name]: e.target.value })}
                  />
                </Grid>

              </Grid>
              <Button
                style={{ height: '50px' }}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={e => { }}
              >
                Adauga Anunt
              </Button>
              <Location />
            </form>
          </div>
        </Container>
      </div>
    </div>
  )
}
