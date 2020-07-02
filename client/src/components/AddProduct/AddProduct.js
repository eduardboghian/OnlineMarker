import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TopBar from '../TopBar'

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Tab from '@material-ui/core/Tab';
import HomeIcon from '@material-ui/icons/Home';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import AppsIcon from '@material-ui/icons/Apps';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import FaceIcon from '@material-ui/icons/Face';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import PetsIcon from '@material-ui/icons/Pets';

import axios from 'axios'
import jwt from 'jsonwebtoken'

import '../../css/AddProduct.css'

export default function AddProduct() {
  const classes = useStyles();
  const [newProduct, setNewProduct] = useState({
    category: ''
  })

  useEffect(() => {
    let userData = jwt.verify(localStorage.getItem('token-market'), 'jwtSecret')
    setNewProduct({
      category: '',
      userId: userData._id,
      username: userData.name
    })
  }, [])

  const handleSubmit = () => {
    axios.post('/api/product/add', { product: newProduct })
      .then(res => console.log(res.data))
      .then(err => console.error(err))
  }

  return (
    <div className='add_product-wr'>
      <TopBar tab={2} />

      <h1 style={{ margin: '25px 15%' }}>Adauga Anunt</h1>

      <div className="add_product-form">
        <h2>Titlu</h2>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="name"
            autoFocus
            label="Titlul Anuntului"
            name="name"
            onChange={e => { setNewProduct({ ...newProduct, [e.target.name]: e.target.value }) }}
            autoComplete="title"
          />
        </Grid>

        <FormControl variant="outlined" className={classes.formControl} style={{ marginTop: '30px', width: '390px', backgroundColor: '#f4f4f4' }}>
          <InputLabel style={{ backgroundColor: '#f4f4f4' }} id="demo-simple-select-outlined-label">Alege Categoria</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={newProduct.category}
            name='category'
            onChange={e => setNewProduct({ ...newProduct, [e.target.name]: e.target.value })}
            label="Alege Categoria"
          >
            <MenuItem value="" style={{ height: '55px', textAlign: 'center' }}>
              <p style={{ textAlign: 'center', width: '100%' }} >None</p>
            </MenuItem>
            <MenuItem value={'Toate'}><Tab style={{ marginLeft: '100px' }} label="Toate" icon={<AppsIcon />} /></MenuItem>
            <MenuItem value={'Imobiliare'}><Tab style={{ marginLeft: '100px' }} label="Imobiliare" icon={<HomeIcon />} /></MenuItem>
            <MenuItem value={'Automobile'}><Tab style={{ marginLeft: '100px' }} label="Automobile" icon={<DriveEtaIcon />} /></MenuItem>
            <MenuItem value={'Electronice'}><Tab style={{ marginLeft: '100px' }} label="Electronice" icon={<PhoneIphoneIcon />} /></MenuItem>
            <MenuItem value={'Moda-Frumusete'}><Tab style={{ marginLeft: '100px' }} label="Moda-Frumusete" icon={<FaceIcon />} /></MenuItem>
            <MenuItem value={'Sport-Hobby'}><Tab style={{ marginLeft: '100px' }} label="Sport-Hobby" icon={<SportsSoccerIcon />} /></MenuItem>
            <MenuItem value={'Servicii-Afaceri'}><Tab style={{ marginLeft: '100px' }} label="Servicii-Afaceri" icon={<BusinessCenterIcon />} /></MenuItem>
            <MenuItem value={'Animale'}><Tab style={{ marginLeft: '100px' }} label="Animale" icon={<PetsIcon />} /></MenuItem>
          </Select>
        </FormControl>

        <Grid item xs={4} style={{ marginTop: '30px' }}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="price"
            label="Pret"
            name="price"
            onChange={e => setNewProduct({ ...newProduct, [e.target.name]: e.target.value })}
            autoComplete="price"
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
            id="shortDescription"
            multiline={true}
            rows={15}
            label="Descriere"
            name="shortDescription"
            onChange={e => setNewProduct({ ...newProduct, [e.target.name]: e.target.value })}
            autoComplete="shortDescription"
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
            id="location"
            label="Oras sau localitate"
            name="location"
            onChange={e => setNewProduct({ ...newProduct, [e.target.name]: e.target.value })}
            autoComplete="location"
          />
        </Grid>

        <Grid item xs={5} style={{ marginTop: '30px' }}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Adresa de email"
            name="title"
            onChange={e => setNewProduct({ ...newProduct, [e.target.name]: e.target.value })}
            autoComplete="email"
          />
        </Grid>

        <Grid item xs={5} style={{ marginTop: '30px' }}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="phone"
            label="Numar de telefon"
            name="phone"
            onChange={e => setNewProduct({ ...newProduct, [e.target.name]: e.target.value })}
            autoComplete="phone"
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
          onClick={e => handleSubmit(e)}
        >
          Adauga Anunt
        </Button>
      </div>

    </div>
  )
}


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
}))