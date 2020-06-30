import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import jwt from 'jsonwebtoken'

import '../css/Home.css'

export default function TopBar(props) {
  const [value, setValue] = React.useState(props.tab);
  const [userData, setUserData] = useState({})

  useEffect(() =>{
    if(localStorage.getItem('token-market')) {
      let data = jwt.verify(localStorage.getItem('token-market'), 'jwtSecret')
      setUserData({...userData, name: data.name})
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
        onClick={(event) => {
          event.preventDefault();
          window.location.href = props.href
        }}
        {...props}
      />
    );
  }

  return (
    <div>
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
            <Select
              label={userData.name}
            >
              <MenuItem value="" style={{ height: '55px', textAlign: 'center' }}>
                <p style={{ textAlign: 'center', width: '100%' }} onClick={e => handleLogout(e)}>Sign Out</p>
              </MenuItem>
            </Select>
          </Tabs>
        }
      </AppBar>
    </div>
  )
}
