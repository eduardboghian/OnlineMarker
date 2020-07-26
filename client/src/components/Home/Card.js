import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import BeenhereIcon from '@material-ui/icons/Beenhere';


import moment from 'moment'
import '../../css/Home.css'

export default function CardItem(props) {
  const classes = useStyles();

  const convertToRon = (value) => {
    let newValue = isNaN(parseFloat(value)) ? 0 : parseFloat(value)
    newValue = newValue * 4.8
    return newValue.toString()
  }

  return (
    <Card
      className={classes.root}
      style={{ margin: '15px', position: 'relative', backgroundColor: '#fff' }}
      onClick={e => window.location.href = `/card/${props.data._id}`}
    >
      <CardHeader
        action={
          <IconButton aria-label="settings">
            {props.data.promovated ? <BeenhereIcon fontSize={'large'} style={{ color: 'blue' }} /> : null}
          </IconButton>
        }
        title={props.data.name}
        subheader={moment(props.data.date).fromNow()}
      />
      <img src={`/api/product/image/${props.data.avatar}`} width="250" alt="" className={classes.media}></img>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" style={{ height: '60px', overflow: 'hidden' }}>
          {props.data.shortDescription}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className='location-sign'>
        <IconButton aria-label="Location" >
          <LocationOnIcon style={{ color: 'red' }} />
        </IconButton>
        <Typography style={{ opacity: '.6' }} > {props.data.location} </Typography>
        <Typography
          style={{
            position: 'absolute',
            right: '0',
            marginRight: '10%',
            fontSize: '15px',
            borderBottom: '1px solid #777'
          }}> {props.valut === 'EUR' ?
            new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(props.data.price) :
            new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'RON' }).format(convertToRon(props.data.price))
          }</Typography>
      </CardActions>
    </Card>
  );
}


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
    margin: '0 4px'
  },
  media: {
    width: '100%',
    height: '200px',
    padding: '0 15px'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));