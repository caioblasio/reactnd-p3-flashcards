import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { createBottomTabNavigator, createMaterialTopTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import { purple, white } from './utils/colors'
import { Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'

function FlashCardsStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const RouteConfigs = {
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: "Your Decks",
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
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
    activeTintColor: Platform.OS === "ios" ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios" ? white : purple,
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

const Tabs =
Platform.OS === "ios"
? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
: createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);

const TabsContainer = createAppContainer(Tabs)

const MainNavigator = createStackNavigator({
  Home: {
    screen: TabsContainer,
    navigationOptions: {
      header: null
    } 
  }
});

const MainNavigatorContainer = createAppContainer(MainNavigator)

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <FlashCardsStatusBar backgroundColor={purple} barStyle="light-content" />
        <MainNavigatorContainer />
      </View>
    );
  }
}
