import UsersList from "./components/UsersList"
import React from "react"
import {Provider} from "react-redux"
import store from "./store"

function App() {
  return (
    <Provider store={store}>
      <UsersList/>
    </Provider>
  )
}

export default App
