import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import NewDeck from '../components/NewDeck'

const MainNavigator = createStackNavigator({
  Home: {
    screen: NewDeck,
    navigationOptions: {
      header: null
    }
  }
});
  
export default createAppContainer(MainNavigator)