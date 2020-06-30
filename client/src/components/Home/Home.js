import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import jwt from 'jsonwebtoken'

import Search from './Search'
import CardItem from './Card';
import Categories from './Categories'
import '../../css/Home.css'

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
  const [userData, setUserData] = useState()

  useEffect(() => {
    if (localStorage.getItem('token-market')) {
      let data = jwt.verify(localStorage.getItem('token-market'), 'jwtSecret')
      console.log(data)
    }
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
            <LinkTab label="Edi Boghian" href="/sign-up" />
          </Tabs>
        }
      </AppBar>
      <Search />
      <Categories />
      <div className="home-wr">
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
      </div>
    </div>
  );
}
