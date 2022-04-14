import React, {PureComponent} from 'react'
import {Routes, Route} from 'react-router-dom'
import Register from './register'
import Apply from './apply'

class Index extends PureComponent {
  render() {
    return (
      <Routes>
        <Route path="/" exact element={<Register/>} />
        <Route path="/apply" exact element={<Apply/>} />
      </Routes>
    )
  }
}
export default Index
