import React, {PureComponent} from 'react'
import {Routes, Route} from 'react-router-dom'
import List from './List'
import Store from './settings/Store'
import StoreEdit from './settings/StoreEdit'

class Index extends PureComponent {
  render() {
    return (
      <Routes>
        <Route path="/" exact element={<List/>} />
        <Route path="/store" exact element={<Store/>} />
        <Route path="/storeEdit" exact element={<StoreEdit/>} />
      </Routes>
    )
  }
}
export default Index
