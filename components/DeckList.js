import React, { Component } from 'react'
import { View, Text, FlatList} from 'react-native'
import { connect } from 'react-redux'

class DeckList extends Component {

  _keyExtractor = (item, index) => item.id

  _renderItem = ({item, index}) => {
    return (
      <View>
        <Text>{item.title}</Text>
      </View>
    )
  }

  render(){
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.props.decks}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}

function mapStateToProps({decks}) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)