import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Home from './components/Home/Home'
import AddProduct from './components/AddProduct/AddProduct'
import SeeProduct from './components/SeeProduct/SeeProduct'
import Messages from './components/DashboardComp'

function App() {
  return (
    <Router>
      <Route exact path='/' component={Home} />
      <Route path='/sign-in' component={SignIn} />
      <Route path='/sign-up' component={SignUp} />
      <Route path='/card/:id' component={SeeProduct} />
      <Route path='/add-product' component={AddProduct} />
      <Route path='/messages' component={Messages} />
    </Router>
  )
}

export default App