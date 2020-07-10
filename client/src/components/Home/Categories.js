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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '80%',
    margin: '0 10%',
    backgroundColor: '#fff',
  },
}));

export default function Categories(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" shadow='none'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Toate" icon={<AppsIcon />} onClick={e => props.filterCards('')} />
          <Tab label="Imobiliare" icon={<HomeIcon />} onClick={e => props.filterCards('Imobiliare')} />
          <Tab label="Automobile" icon={<DriveEtaIcon />} onClick={e => props.filterCards('Automobile')} />
          <Tab label="Electronice" icon={<PhoneIphoneIcon />} onClick={e => props.filterCards('Electronice')} />
          <Tab label="Sport-Hobby" icon={<SportsSoccerIcon />} onClick={e => props.filterCards('Sport-Hobby')} />
          <Tab label="Servicii-Afaceri" icon={<BusinessCenterIcon />} onClick={e => props.filterCards('Servicii-Afaceri')} />
          <Tab label="Moda-Frumusete" icon={<FaceIcon />} onClick={e => props.filterCards('Moda-Frumusete')} />
          <Tab label="Animale" icon={<PetsIcon />} onClick={e => props.filterCards('Animale')} />
        </Tabs>
      </AppBar>
    </div>
  );
}
