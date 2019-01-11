import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'
import { addDeck } from '../actions/decks'
import { purple , white } from '../utils/colors'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.submitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class NewDeck extends Component {

  state = {
    title: ''
  }

  submit = () => {
    
    const { title } = this.state
    const { addDeck, navigation } = this.props

    if (title.length === 0) {
      alert('Please fill title field')
      return
    }

    const deck = {id : uuidv4(), title : title, questions: []}
    addDeck(deck)
    this.reset()
    //navigation.navigate('DeckViewScreen', {id: deck.id, title: deck.title})
  }

  reset = () => {
    this.setState({
      title: '',
    })
  }

  render(){
    return(
      <View style={styles.container}>
        <View>
          <Text style={styles.titleText}>What is the title of your new deck?</Text>
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.textInput}
            placeholder='Deck title...'
            onChangeText={(text) => this.setState({ title: text })}
            value={this.state.title}
          />
        </View>
        <SubmitBtn onPress={this.submit}/>
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
    borderColor: purple,
    borderWidth: 1,
    height: 50,
    paddingLeft: 5,
    borderRadius: 7,
    marginBottom: 0
  },
  submitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 25,
  },
  submitBtnText: {
    color: white,
    fontSize: 20,
    textAlign: 'center',
  },
})

function mapDispatchToProps(dispatch) {
  return {
    addDeck : (deck) => dispatch(addDeck(deck)),
  }
}

export default connect(null, mapDispatchToProps)(NewDeck)