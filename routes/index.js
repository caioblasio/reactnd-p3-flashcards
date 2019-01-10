import React from 'react'
import { createBottomTabNavigator, createAppContainer} from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import DeckNavigation from './deckNavigation'
import AddDeckNavigation from './addDeckNavigation'

const RouteConfigs = {
  DeckList: {
    screen: DeckNavigation,
    navigationOptions: {
      tabBarLabel: "Your Decks",
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeckNavigation,
    navigationOptions: {
      tabBarLabel: "Add Deck",
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  }
}
    
const TabNavigatorConfig = {
  navigationOptions: {
      header: null
  },
  tabBarOptions: {
    activeTintColor: purple,
    style: {
      height: 56,
      backgroundColor: white,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}

export default createAppContainer(createBottomTabNavigator(RouteConfigs, TabNavigatorConfig))