import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import jwt from 'jsonwebtoken'

import Search from './Search'
import CardItem from './Card';
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

  useEffect(() => {
    axios.get('/api/product/get')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    if (localStorage.getItem('token-market')) {
      let data = jwt.verify(localStorage.getItem('token-market'), 'jwtSecret')
      setUserData({ ...userData, name: data.name })
    }
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem('token-market')
  };

  return (
    <div className={classes.root}>
      <div className="logo">Logo.</div>
      <AppBar position="static" style={{ paddingLeft: '50%', paddingRight: '10%', boxShadow: 'none !important', display: 'none' }}>
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
      <Search />
      <Categories />
      <div className="home-wr">
        {
          products.map((prod, i) => {
            return <CardItem data={prod} key={i} />
          })
        }
      </div>
    </div>
  );
}



// <p style={showButton ?
//   {
//     textAlign: 'center',
//     width: '15%',
//     position: 'absolute',
//     top: '40px',
//     left: '80%',
//     backgroundColor: '#f4f4f4',
//     zIndex: '1',
//     height: '50px'
//   } : { display: 'none' }} onClick={e => handleLogout(e)}>Sign Out</p>