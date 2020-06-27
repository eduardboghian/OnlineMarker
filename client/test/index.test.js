import React from 'react'
import ReactDOM from 'react-dom'
import App from '../src/App'
import SignIn from '../src/components/SignIn'

it('should render app', () => {
  let div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('should render signin', () => {
  let div = document.createElement('div')
  ReactDOM.render(<SignIn />, div)
  ReactDOM.unmountComponentAtNode(div)
})