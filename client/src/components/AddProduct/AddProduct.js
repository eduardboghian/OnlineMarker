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

      <h1 style={{ margin: '25px 15%' }}>Adauga Anunt</h1>

      <div className="add_product-form">
        <h2>Titlu</h2>
        <Grid item xs={6}>
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

        <Grid item xs={4} style={{ marginTop: '30px' }}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="title"
            label="Categoria"
            name="title"
            onChange={e => setUserData({ ...userData, [e.target.name]: e.target.value })}
            autoComplete="title"
          />
        </Grid>

        <Grid item xs={4} style={{ marginTop: '30px' }}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="title"
            label="Pret"
            name="title"
            onChange={e => setUserData({ ...userData, [e.target.name]: e.target.value })}
            autoComplete="title"
          />
        </Grid>
      </div>

      <div className="add_product-form" style={{ marginTop: '30px' }}>
        <h2>Descriere</h2>
        <Grid item xs={7} style={{ heigth: '300px' }}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="title"
            multiline={true}
            rows={15}
            label="Descriere"
            name="title"
            onChange={e => setUserData({ ...userData, [e.target.name]: e.target.value })}
            autoComplete="title"
          />
        </Grid>
        <p>Maxim 9000 de caractere *</p>
      </div>

      <div className="add_product-form" style={{ marginTop: '30px', height: '350px' }}>
        <h2>Fotografii</h2>

      </div>

      <div className="add_product-form" style={{ marginTop: '30px' }}>
        <h2>Date de contact</h2>
        <Grid item xs={5} style={{ marginTop: '30px' }}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="title"
            label="Oras sau localitate"
            name="title"
            onChange={e => setUserData({ ...userData, [e.target.name]: e.target.value })}
            autoComplete="title"
          />
        </Grid>

        <Grid item xs={5} style={{ marginTop: '30px' }}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="title"
            label="Adresa de email"
            name="title"
            onChange={e => setUserData({ ...userData, [e.target.name]: e.target.value })}
            autoComplete="title"
          />
        </Grid>

        <Grid item xs={5} style={{ marginTop: '30px' }}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="title"
            label="Numar de telefon"
            name="title"
            onChange={e => setUserData({ ...userData, [e.target.name]: e.target.value })}
            autoComplete="title"
          />
        </Grid>
      </div>

      <div className="add_product-form" style={{ marginTop: '30px' }}>
        <Button
          style={{ height: '45px', width: '20%', margin: '0 40%' }}
          type="submit"
          size='large'
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={e => { }}
        >
          Adauga Anunt
        </Button>
      </div>

    </div>
  )
}
