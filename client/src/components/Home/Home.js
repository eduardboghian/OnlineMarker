import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import jwt from 'jsonwebtoken'

import Search from './Search'
import CardItem from './Card';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
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
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0)
  const [userData, setUserData] = useState({})
  const [products, setProducts] = useState([])
  const [showButton, setButton] = useState(false)
  const [filtrated, setFilt] = useState([])
  const [filterValue, setFilter] = useState('')

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
    }
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleLogout = () => {
    localStorage.removeItem('token-market')
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
      <div className="logo">Logo.</div>
      <AppBar position="static" style={{ paddingLeft: '50%', paddingRight: '10%', boxShadow: 'none !important' }}>
        {!localStorage.getItem('token-market') ?
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <LinkTab label="Home" href="/" />
            <LinkTab label="Login" href="/sign-in" />
            <LinkTab label="Sign Up" href="/sign-up" />
          </Tabs> :
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <LinkTab label="Home" href="/" />
            <LinkTab label="Messages" href="/sign-in" />
            <LinkTab label="Add Product" href="/add-product" />
            <LinkTab label={userData.name} href="#" onClick={e => setButton(!showButton)} />
          </Tabs>
        }
      </AppBar>
      <Search searchCard={searchCard} />
      <Categories filterCards={filterCards} />
      <h3 style={{
        width: '80%',
        margin: '30px 10% 0'
      }}><CheckCircleIcon className='check-mark' fontSize={"large"} /> Anunturi Promovate</h3>
      <div className="home-wr">

        {
          filtrated.map((prod, i) => {
            return <CardItem data={prod} key={i} />
          })
        }
      </div>
    </div>
  );
}