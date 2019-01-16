import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { addQuestion } from '../../actions/decks'
import { bgColors, black } from '../../utils/colors'
import TextButton from '../TextButton'

class NewQuestion extends Component {

  state = {
    question: '',
    answer: ''
  }

  static navigationOptions = ({ navigation }) => {
    const { index } = navigation.state.params
    return {
      title: 'New Question',
      headerStyle: {
        backgroundColor: bgColors[index % 4],
      }
    }
  }

  submit = () => {
    const { question, answer} = this.state
    const { addQuestion, navigation } = this.props
    const { deck } = navigation.state.params

    if (question.length === 0 || answer.length === 0) {
      alert('Please fill in all fields')
      return
    }

    addQuestion(deck.id, {question , answer})
    this.reset()
    navigation.goBack()
  }

  reset = () => {
    this.setState({
      question: '',
      answer: ''
    })
  }

  render(){
    const { deck: { title }, index } = this.props.navigation.state.params
    return(
      <View style={styles.container}>
        <View>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.textInput}
            placeholder='Question...'
            onChangeText={(text) => this.setState({ question: text })}
            value={this.state.question}
          />
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.textInput}
            placeholder='Answer...'
            onChangeText={(text) => this.setState({ answer: text })}
            value={this.state.answer}
          />
        </View>
        <View style={styles.row}>
          <TextButton onPress={this.submit} style={{backgroundColor: bgColors[index % 4]}}>
            Create Card
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
  },
  row: {
    marginTop: 25,
  },
  titleText: {
    fontSize: 30,
    lineHeight: 40,
  },
  textInput: {
    borderColor: black,
    borderWidth: 1,
    height: 50,
    paddingLeft: 5,
    borderRadius: 7,
    marginBottom: 0
  },
})

function mapDispatchToProps(dispatch) {
  return {
    addQuestion: (deckId, question) => dispatch(addQuestion(deckId, question)),
  }
}


export default connect(null, mapDispatchToProps)(NewQuestion)

