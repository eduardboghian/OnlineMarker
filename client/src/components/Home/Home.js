import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import jwt from 'jsonwebtoken'

import Search from './Search'
import CardItem from './Card'
import Location from '../Location'
import Footer from '../Footer'
import Categories from './Categories'
import '../../css/Home.css'
import axios from 'axios'


function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
        window.location.href = props.href
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#f4f4f4',
    position: 'relative',
    minHeight: '100vh',
    paddingBottom: '180px'
  },
}));

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0)
  const [userData, setUserData] = useState({})
  const [userId, setId] = useState('')
  const [products, setProducts] = useState([])
  const [filtrated, setFilt] = useState([])
  const [filterValue, setFilter] = useState('')
  const [menu, showMenu] = useState(false)
  const [valut, setValut] = useState('EUR')
  const [priceFiler, setPriceFilter] = useState({
    priceMin: 0,
    priceMax: 9999999999
  })
  const [location, setLocation] = useState('')

  useEffect(() => {
    axios.get('/api/product/get')
      .then(res => {
        setProducts(res.data)
        setFilt(res.data)
      })
      .catch(err => console.error(err))

    if (localStorage.getItem('token-market')) {
      let data = jwt.verify(localStorage.getItem('token-market'), 'jwtSecret')
      setUserData({ ...userData, name: data.name })
      setId(data._id)
    }
  }, [])

  useEffect(() => {
    let prods = [...products]
    if (valut === 'EUR') {
      prods = prods.filter(item => parseFloat(item.price) > priceFiler.priceMin)
      prods = prods.filter(item => parseFloat(item.price) < priceFiler.priceMax)
    } else {
      prods = prods.filter(item => parseFloat(item.price) * 4.8 > priceFiler.priceMin)
      prods = prods.filter(item => parseFloat(item.price) * 4.8 < priceFiler.priceMax)
    }
    setFilt(prods)
    if (priceFiler.priceMax === '' && priceFiler.priceMax) setFilt(products)
  }, [priceFiler])

  useEffect(() => {
    let prods = [...products]

    prods = prods.filter(item => location.includes(item.location))

    setFilt(prods)
    if (location === '') setFilt(products)
  }, [location])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleLogout = () => {
    localStorage.removeItem('token-market')
    window.location.href = '/'
  }

  const newProduct = (value) => {
    setLocation(value.location)
  }

  const filterCards = (filter) => {
    setFilter(filter)
    let prods = [...products]
    prods = prods.filter(item => item.category === filter)
    setFilt(prods)
    if (filter === '') setFilt(products)
  }

  const searchCard = (filter) => {
    let prods = [...products]
    prods = prods.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
    setFilt(prods)
    if (filter === '') filterCards(filterValue)
  }

  return (
    <div className={classes.root}>
      <div className="logo">OnlineMarket.</div>
      <AppBar position="static" style={{ paddingLeft: '50%', paddingRight: '10%', boxShadow: 'none !important' }}>
        {!localStorage.getItem('token-market') ?
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <LinkTab label="Acasa" href="/" />
            <LinkTab label="Autentificare" href="/sign-in" />
            <LinkTab label="Inregistreaza-te" href="/sign-up" />
          </Tabs> :
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <LinkTab label="Acasa" href="/" />
            <LinkTab label="Mesaje" href={`/chat/${userId}/${userId}`} />
            <LinkTab label="Adauga Anunt" href="/add-product" />
            <LinkTab label={userData.name} onClick={e => showMenu(!menu)} />
          </Tabs>
        }
      </AppBar>

      <section className="user-menu" style={menu ? {} : { display: 'none' }}>
        <button
          className="sign-out-btn"
          style={{ backgroundColor: '#fff', color: '#000' }}
          onClick={e => window.location.href = '/my-fav'}
        >Anunturi Favorite</button>
        <button
          className="sign-out-btn"
          onClick={e => window.location.href = '/my-products'}
          style={{ backgroundColor: '#fff', color: '#000' }}
        >Anunturile Tale</button>
        <button className="sign-out-btn" onClick={e => handleLogout()}>Delogheaza-te!</button>
      </section>


      <Search searchCard={searchCard} />

      <Categories filterCards={filterCards} />

      <div className="filters">
        <div className="pret">
          Pret ({valut}):
          <Grid item xs={5} style={{ margin: '0 10px' }}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="pretmin"
              rows={15}
              label="Pret Min"
              name="PretMin"
              onChange={e => { setPriceFilter({ ...priceFiler, priceMin: e.target.value }) }}
            />
          </Grid> -
          <Grid item xs={5} style={{ margin: '0 10px' }}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="pretmax"
              rows={15}
              label="Pret Max"
              name="PretMax"
              onChange={e => { setPriceFilter({ ...priceFiler, priceMax: e.target.value }) }}
            />
          </Grid>
        </div>

        <div className="locatie">
          <p style={{ margin: '0 10px' }}>Locatie:</p>
          <Location setNewProduct={newProduct} />
        </div>
      </div >

      <div style={{
        width: '80%',
        margin: '30px 10% 0'
      }}>
        <h3 style={{
          width: '60%',
          margin: '0 !important',
          float: 'left'

        }}><CheckCircleIcon className='check-mark' fontSize={"large"} /> Anunturi Promovate</h3>

        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={valut}
          onChange={e => setValut(e.target.value)}
          label="valut"
          style={{
            width: '20%',
            height: '42px',
            backgroundColor: '#fff',
            borderRadius: '4px',
            paddingLeft: '10px',
            float: 'right'
          }}
        >
          <MenuItem value={'EUR'}>Euro</MenuItem>
          <MenuItem value={'RON'}>Ron</MenuItem>
        </Select>
      </div>

      <div className="home-wr">
        {
          filtrated.map((prod, i) => {
            return prod.promovated ? <CardItem data={prod} valut={valut} key={i} /> : null
          })
        }

        <h3 style={{
          width: '100%',
          margin: '30px 0 10px',
          borderBottom: '1px solid #000',
          gridColumnStart: 1,
          gridColumnEnd: 5
        }}>Alte Anunturi</h3>


        {
          filtrated.map((prod, i) => {
            return <CardItem data={prod} valut={valut} key={i} />
          })
        }
      </div>
      <Footer />
    </div >
  );
}