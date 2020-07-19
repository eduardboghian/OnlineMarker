import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import jwt from 'jsonwebtoken'

import '../css/Home.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    position: 'fixed',
    top: '0',
    width: '100%',
    zIndex: '999'
  },
}));

export default function TopBar(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.tab);
  const [userData, setUserData] = useState({})
  const [menu, showMenu] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('token-market')) {
      let data = jwt.verify(localStorage.getItem('token-market'), 'jwtSecret')
      setUserData({ ...userData, name: data.name })
    }
  }, [])

  const handleChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem('token-market')
    window.location.href = '/'
  };

  function LinkTab(props) {
    return (
      <Tab
        component="a"
        className='tab'
        onClick={(event) => {
          event.preventDefault();
          window.location.href = props.href
        }}
        {...props}
      />
    );
  }

  return (
    <div className={classes.root}>
      <div
        className="logo"
        style={{ cursor: 'pointer' }}
        onClick={e => window.location.href = '/'}
      >OnlineMarket.</div>

      <AppBar position="static" className='app-bar' style={{ paddingLeft: '50%', paddingRight: '10%', boxShadow: 'none !important' }}>
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
            <LinkTab label="Mesaje" href="#" />
            <LinkTab label="Adauga Anunt" href="/add-product" />
            <LinkTab label={userData.name} onClick={e => showMenu(!menu)} />
          </Tabs>
        }
      </AppBar>

      <section className="user-menu" style={menu ? {} : { display: 'none' }}>
        <button className="sign-out-btn" style={{ backgroundColor: '#fff', color: '#000' }}>Anunturile Tale</button>
        <button className="sign-out-btn" style={{ backgroundColor: '#fff', color: '#000' }}>Anunturi Favorite</button>
        <button className="sign-out-btn" onClick={e => handleLogout()}>Delogheaza-te!</button>
      </section>

    </div>
  )
}
