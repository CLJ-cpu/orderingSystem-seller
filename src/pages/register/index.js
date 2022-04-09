import React, {PureComponent} from 'react'
import {Routes, Route} from 'react-router-dom'
import StepOne from './StepOne'

class Index extends PureComponent {
  render() {
    return (
      <Routes>
        <Route path="/" exact element={<StepOne/>} />
      </Routes>
    )
  }
}
export default Index
