import React, {PureComponent} from 'react'
import {Routes, Route} from 'react-router-dom'
import Register from './register'
import Apply from './apply'
import ApplyForm from './applyForm'

class Index extends PureComponent {
  render() {
    return (
      <Routes>
        <Route path="/" exact element={<Register/>} />
        <Route path="/apply" exact element={<Apply/>} />
        <Route path="/apply/form" exact element={<ApplyForm/>} />
      </Routes>
    )
  }
}
export default Index
