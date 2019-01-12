import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput} from 'react-native'
import { connect } from 'react-redux'
import { bgColors, purple, white } from '../../utils/colors'

class NewQuestion extends Component {

  static navigationOptions = ({ navigation }) => {
    const { deck: { title }, index } = navigation.state.params
    return {
      title: title,
      headerStyle: {
        backgroundColor: bgColors[index % 2],
      }
    }
  }

  render(){
    return(
      <View>
        <Text>New Question</Text>
      </View>
    )
  }
}

export default NewQuestion

