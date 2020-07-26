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

      setUserData({ ...userData, name: data.name })
      setId(data._id)
    }
  }, [])

  useEffect(() => {
    if (userId) {
      let newCards = [...dbCards]
      let filtered = newCards.filter(item => item.userId === userId)

      setCards(filtered)
    }
  }, [userId, dbCards])

  const deleteProduct = (id) => {
    axios.delete('/api/product/delete', {
      data: { id }
    })
  }

  return (
    <div style={{
      backgroundColor: '#f4f4f4',
      height: '150vh',
    }}>
      <TopBar />
      <div className="mele-wr">
        <h1>Anunturile mele</h1>
        <div className="mycards-wr">
          {cards.length > 0 ? cards.map((card, i) => {
            return <div className='mycard' key={i}>

              <div
                className='delete-btn'
                onClick={e => deleteProduct(card._id)}
              >X</div>

              <Card data={card} valut={'EUR'} />

              {card.promovated ? null : <div className='promoveaza'>Promoveaza Anuntul</div>}
            </div>
          }) : <div className='nu-sunt'>Nu aveti niciun anunt!</div>}
        </div>
      </div>
    </div>
  )
}
