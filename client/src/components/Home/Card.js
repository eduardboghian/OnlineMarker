import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import moment from 'moment'

export default function CardItem(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false)

  useEffect(() => {
    console.log(props.data)
  }, [props])

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root} style={{ margin: '20px', position: 'relative', backgroundColor: '#f4f4f4' }}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.data.username[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.data.name}
        subheader={moment(props.data.date).format('YYYY MMMM DD')}
      />
      <img src={`/api/product/image/${props.data.avatar}`} width="250" alt="" className={classes.media}></img>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" style={{ height: '50px' }}>
          {props.data.shortDescription}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Location">
          <LocationOnIcon />
        </IconButton>
        <Typography style={{ opacity: '.6' }} > {props.data.location} </Typography>
        <Typography style={{ opacity: '.6', position: 'absolute', right: '0', marginRight: '10%', fontSize: '15px' }} > {props.data.price} EUR</Typography>
      </CardActions>
    </Card>
  );
}


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: '0 4px'
  },
  media: {
    width: '100%',
    height: '200px',
    padding: '3px'
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