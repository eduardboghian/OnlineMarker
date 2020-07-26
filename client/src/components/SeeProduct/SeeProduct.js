import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import IconButton from '@material-ui/core/IconButton';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import MessageIcon from '@material-ui/icons/Message';
import StarsIcon from '@material-ui/icons/Stars';

import TopBar from '../TopBar'
import Footer from '../Footer'

import axios from 'axios'
import moment from 'moment'
import jwt from 'jsonwebtoken'
import '../../css/SeeProduct.css'

export default function SeeProduct() {
  const [data, setData] = useState({})
  const [userData, setUserData] = useState({})

  useEffect(() => {
    let id = window.location.pathname.split('/')
    id = id[id.length - 1]

    if (localStorage.getItem('token-market')) {
      setUserData(jwt.verify(localStorage.getItem('token-market'), 'jwtSecret'))
    }

    axios.get(`/api/product/get/${id}`)
      .then(res => {
        setData(res.data)
        console.log(res)
      })
      .catch(err => console.error(err))
  }, [])

  const addFav = () => {
    axios.post('/api/add-fav', {
      uid: userData._id,
      pid: data._id
    })
  }

  return (
    <div style={{
      margin: '70px 0 0',
      backgroundColor: '#f0f0f0',
      width: '99.2vw',
      height: '1800px',
      position: 'relative',
    }}>
      <TopBar tab={3} />

      <div className="product-wr" >
        <h3 >{data.name}</h3>

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
        <div className='name-wr'>
          <PersonIcon className='person-icon' fontSize={'large'} />
          <h4>{data.username}</h4>
        </div>
        <section className='see-phone'><PhoneIcon style={{ marginRight: '10px' }} />{data.phone}</section>

        <section
          style={data.userId === userData._id ? { display: 'none' } : {}}
          className='see-message'
          onClick={e => window.location.href = `/chat/${data.userId}/${userData._id}`}
        ><MessageIcon style={{ marginRight: '10px' }} /> Trimite Mesaj</section>


        <section
          className='see-fav'
          onClick={e => addFav()}
        ><StarsIcon style={{ marginRight: '10px' }} />Salveaza Anuntul</section>
      </div>

      <div className="verifica-wr" style={data.category === 'Servicii-Afaceri' ? { display: 'none' } : {}} >
        <div className='title-wr'>
          <h4 style={{ textAlign: 'center', fontWeight: 'bold' }}>Verifica Anuntul!</h4>
        </div>
        <p>Daca sunteti interesat de produs si vreti sa fie verificat de echipa noastra de profesionisti, puteti achizitiona acest serviciu la doar:</p>
        <section>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data.price * 0.05)}</section>
        <button>Verifica!</button>
      </div>

      <div className="sent-message-wr">
        <h1>Trimite Mesaj</h1>
        <form action={`https://formspree.io/${userData.email}`} method='POST'>
          <label className='imp'>
            <p>Name:</p>
            <input type="text" name="name" />
          </label>
          <label className='imp'>
            <p>Email:</p>
            <input type="email" name="email" />
          </label>
          <label className='imp'>
            <p>Message:</p>
            <textarea type="text" name="message" />
          </label>
          <button type="submit" className='submit-message'>Trimite Mesaj</button>
        </form>
      </div>

      <Footer />

    </div>
  )
}
