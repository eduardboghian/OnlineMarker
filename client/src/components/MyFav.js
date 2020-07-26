import React, { useState, useEffect } from 'react'

import TopBar from '../components/TopBar'
import Footer from '../components/Footer'
import Card from './Home/Card'

import jwt from 'jsonwebtoken'
import axios from 'axios'
import '../css/AnunturileMele.css'

export default function MyProducts() {
  const [userData, setUserData] = useState({})
  const [userId, setId] = useState('')
  const [cards, setCards] = useState([])
  const [dbCards, setDBCards] = useState([])

  useEffect(() => {
    axios.get('/api/product/get')
      .then(res => {
        setDBCards(res.data)
      })
      .catch(err => console.error(err))

    if (localStorage.getItem('token-market')) {
      let data = jwt.verify(localStorage.getItem('token-market'), 'jwtSecret')

      axios.get(`/api/get/${data._id}`)
        .then(res => setUserData(res.data))
        .catch(err => console.error(err))

      setId(data._id)
    }
  }, [])

  useEffect(() => {
    console.log(userData)
    if (userId && userData.favList) {
      let newCards = [...dbCards]
      let filtered = newCards.filter(item => userData.favList.includes(item._id))

      setCards(filtered)
    }
  }, [userId, dbCards, userData])

  return (
    <div style={{
      backgroundColor: '#f4f4f4',
      height: '150vh',
    }}>
      <TopBar />
      <div className="mele-wr">
        <h1>Anunturile Favorite</h1>
        <div className="mycards-wr">
          {cards.length > 0 ? cards.map((card, i) => {
            return <Card data={card} valut={'EUR'} key={i} />
          }) : <div className='nu-sunt'>Nu aveti niciun anunt favorit!</div>}
        </div>
      </div>
    </div>
  )
}
