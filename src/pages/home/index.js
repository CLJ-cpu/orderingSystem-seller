import React, {PureComponent} from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './home'


class Index extends PureComponent {
  render() {
    return (
      <Routes>
        <Route path="/" exact element={<Home/>} />
      </Routes>
    )
  }
}
export default Index
