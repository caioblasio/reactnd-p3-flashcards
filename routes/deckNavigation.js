import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import DeckList from '../components/DeckList'

const MainNavigator = createStackNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: {
      header: null
    } 
  }
});
  
export default createAppContainer(MainNavigator)