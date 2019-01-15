import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'
import { addDeck } from '../actions/decks'
import { purple, black } from '../utils/colors'
import TextButton from './TextButton'

class NewDeck extends Component {

  state = {
    title: ''
  }

  submit = () => {
    
    const { title } = this.state
    const { addDeck, navigation, deckCount } = this.props

    if (title.length === 0) {
      alert('Please fill title field')
      return
    }

    const deck = {id : uuidv4(), title : title, questions: []}
    addDeck(deck)
    this.reset()
    navigation.navigate('DeckView', { index: deckCount, id: deck.id, title: deck.title })
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
        <View style={styles.row}>
          <TextButton onPress={this.submit} style={{backgroundColor: purple}}>
            SUBMIT
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

function mapStateToProps({ decks }) {
  return {
    deckCount: decks.length
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addDeck : (deck) => dispatch(addDeck(deck)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)