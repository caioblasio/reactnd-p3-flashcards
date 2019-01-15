import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { bgColors } from '../../utils/colors'
import { connect } from 'react-redux'
import TextButton from '../TextButton'

class DeckView extends Component {

  static navigationOptions = ({ navigation }) => {
    const { title, index } = navigation.state.params
    return {
      title: title,
      headerStyle: {
        backgroundColor: bgColors[index % 4]
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
            <TextButton 
              onPress={() => navigation.navigate('Quiz', { index, deck })}
              style={{backgroundColor: bgColors[index % 4]}}
            >
              Start Quiz
            </TextButton>
          </View>
        }
        <View style={styles.row}>
          <TextButton 
            onPress={() => navigation.navigate('NewQuestion', { index, deck })}
            style={{backgroundColor: bgColors[index % 4]}}
          >
            Add Card
          </TextButton>
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