import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import DeckList from '../components/Deck/DeckList'
import DeckView from '../components/Deck/DeckView'
import NewQuestion from '../components/Deck/NewQuestion'
import { purple, white } from '../utils/colors'

const MainNavigator = createStackNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: {
      header: null
    } 
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      headerTintColor: white,
    },
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: {
      headerTintColor: white,
    },
  }
});
  
export default createAppContainer(MainNavigator)