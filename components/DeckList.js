import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { purple, gray, white } from '../utils/colors'

class DeckList extends Component {

  _keyExtractor = (item, index) => item.id

  _renderItem = ({item, index}) => {
    return (
      <View style={[styles.item, { backgroundColor: bgColors[index % 2] }]}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemQuestionQty}>{item.questions.length} cards</Text>
      </View>
    )
  }

  render(){
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.decks}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
  },
  itemTitle: {
    fontSize: 30,
    color: white,
  },
  itemQuestionQty: {
    fontSize: 20,
    color: white,
  }
})

const bgColors = [purple, gray]

function mapStateToProps({decks}) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)