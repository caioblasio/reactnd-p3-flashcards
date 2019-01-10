import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import AddDeck from '../components/AddDeck'

const MainNavigator = createStackNavigator({
  Home: {
    screen: AddDeck,
    navigationOptions: {
      header: null
    } 
  }
});
  
export default createAppContainer(MainNavigator)