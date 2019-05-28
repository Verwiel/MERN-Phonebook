import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Form from './Form'
import Details from './Details'
import '../App.css'

export default () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/user" component={Form} />
        <Route exact path="/user/:id" component={Details} />
      </Switch>
    </div>
  )
}
