import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { bgColors, purple, white } from '../../utils/colors'
import { connect } from 'react-redux'

function SubmitBtn ({ onPress, text }) {
  return (
    <TouchableOpacity
      style={styles.submitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>{text}</Text>
    </TouchableOpacity>
  )
}

class DeckView extends Component {

  static navigationOptions = ({ navigation }) => {
    const { title, index } = navigation.state.params
    return {
      title: title,
      headerStyle: {
        backgroundColor: bgColors[index % 2],
      }
    }
  }

  render(){
    const  { index, questionCount , deck, navigation } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.titleText}>{deck.title}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.questionQtyText}>{questionCount} cards</Text>
        </View>
        {questionCount > 0 && 
          <View style={styles.row}>
            <SubmitBtn text="Start Quiz"></SubmitBtn>
          </View>
        }
        <View style={styles.row}>
          <SubmitBtn onPress={() => navigation.navigate('NewQuestion', { index, deck })} text="Add Card"></SubmitBtn>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
  },
  row: {
    marginTop: 25,
  },
  titleText: {
    fontSize: 30,
    lineHeight: 40,
  },
  questionQtyText: {
    fontSize: 20,
  },
  submitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 7,
    height: 45,
  },
  submitBtnText: {
    color: white,
    fontSize: 20,
    textAlign: 'center',
  },
})

function mapStateToProps({ decks }, { navigation }) {
  let { id, index } = navigation.state.params
  let deck = decks.find(item => item.id === id)

  return {
    deck,
    questionCount: deck.questions.length,
    index: index
  }
}

export default connect(mapStateToProps)(DeckView)