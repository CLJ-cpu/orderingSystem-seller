import React, {PureComponent} from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from './form'

class Index extends PureComponent {
  render() {
    return (
      <Routes>
        <Route path="/" exact element={<Login/>} />
      </Routes>
    )
  }
}
export default Index
