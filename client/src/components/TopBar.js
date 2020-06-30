import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import '../css/Home.css'

export default function TopBar(props) {
  const [value, setValue] = React.useState(props.tab);

  const handleChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue);
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
            <LinkTab label="Edi Boghian" href="#" />
          </Tabs>
        }
      </AppBar>
    </div>
  )
}
