import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import HomeIcon from '@material-ui/icons/Home';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import AppsIcon from '@material-ui/icons/Apps';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import FaceIcon from '@material-ui/icons/Face';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import PetsIcon from '@material-ui/icons/Pets';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '80%',
    margin: '0 10%',
    backgroundColor: 'white',
  },
}));

export default function Categories() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Toate" icon={<AppsIcon />} />
          <Tab label="Imobiliare" icon={<HomeIcon />} />
          <Tab label="Automobile" icon={<DriveEtaIcon />} />
          <Tab label="Electronice" icon={<PhoneIphoneIcon />} />
          <Tab label="Moda-Frumusete" icon={<FaceIcon />} />
          <Tab label="Sport-Hobby" icon={<SportsSoccerIcon />} />
          <Tab label="Servicii-Afaceri" icon={<BusinessCenterIcon />} />
          <Tab label="Animale" icon={<PetsIcon />} />
        </Tabs>
      </AppBar>
    </div>
  );
}
