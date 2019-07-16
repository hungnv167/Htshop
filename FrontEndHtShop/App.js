import React, { Component } from 'react'
import { createAppContainer } from 'react-navigation'
import AppSwitchNavigator from './navigation/AppSwitchNavigator'
import {CartProvider} from './components/CartProvider'
const AppContainer = createAppContainer(AppSwitchNavigator)
export default class App extends Component {
  render() {
    return (
      <CartProvider>
        <AppContainer/>
      </CartProvider>
    )
  }
}
