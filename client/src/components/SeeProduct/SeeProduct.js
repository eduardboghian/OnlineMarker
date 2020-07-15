import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import IconButton from '@material-ui/core/IconButton';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import TopBar from '../TopBar'

import axios from 'axios'
import moment from 'moment'
import '../../css/SeeProduct.css'

export default function SeeProduct() {
  const [data, setData] = useState({})

  useEffect(() => {
    let id = window.location.pathname.split('/')
    id = id[id.length - 1]

    axios.get(`/api/product/get/${id}`)
      .then(res => setData(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div style={{
      margin: '50px 0 0',
      backgroundColor: '#f0f0f0',
      width: '99.2vw',
      height: '120vh',
      position: 'relative',
    }}>
      <TopBar tab={3} />

      <div className="product-wr">
        <h3>{data.name}</h3>

        <div className="location">
          <IconButton aria-label="Location">
            <LocationOnIcon style={{ color: 'red' }} />
          </IconButton>
          <Typography style={{ lineHeight: '30px' }}> {data.location} </Typography>
        </div>
        <p className='date'> <AccessTimeIcon /> {moment(data.date).fromNow()} </p>

        <Typography className='price'>
          {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data.price)}
        </Typography>

        <img src={`/api/product/image/${data.avatar}`} alt=""></img>

        <p className='prod-desc'>{data.shortDescription}</p>

      </div>

      <div className="user-wr">
        {data.username}
      </div>

    </div>
  )
}
