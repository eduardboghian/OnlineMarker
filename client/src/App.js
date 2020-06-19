import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Home from './components/Home/Home'

function App() {
  return (
    <Router>
      <Route exact path='/' component={Home} />
      <Route path='/sign-in' component={SignIn} />
      <Route path='/sign-up' component={SignUp} />
    </Router>
  )
}

export default App