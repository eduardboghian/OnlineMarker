import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Home from './components/Home/Home'
import AddProduct from './components/AddProduct/AddProduct'
import SeeProduct from './components/SeeProduct/SeeProduct'
import Messages from './components/DashboardComp'
import MyProducts from './components/MyProducts'
import MyFav from './components/MyFav'

function App() {
  return (
    <Router>
      <Route exact path='/' component={Home} />
      <Route path='/sign-in' component={SignIn} />
      <Route path='/sign-up' component={SignUp} />
      <Route path='/card/:id' component={SeeProduct} />
      <Route path='/my-products' component={MyProducts} />
      <Route path='/my-fav' component={MyFav} />
      <Route path='/add-product' component={AddProduct} />
      <Route path='/chat/:uid1/:uid2' component={Messages} />
    </Router>
  )
}

export default App