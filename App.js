import React, { Component } from 'react';
import { View, StatusBar, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { Constants } from 'expo'
import { black } from './utils/colors'
import { setLocalNotification } from './utils/helpers'
import MainNavigatorContainer from './routes'

function FlashCardsStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends Component {

  componentDidMount() {
    setLocalNotification();
  }

  renderLoading = () => {
    <View style={{flex: 1}}>
      <ActivityIndicator size="large"/>
    </View>
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={this.renderLoading()} persistor={persistor}>
          <View style={{flex: 1}}>
            <FlashCardsStatusBar backgroundColor={black} barStyle="light-content" />
            <MainNavigatorContainer />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}
