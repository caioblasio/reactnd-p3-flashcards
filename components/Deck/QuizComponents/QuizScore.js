import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import TextButton from '../../TextButton'

class QuizScore extends Component {

  render(){
    const { correctAnswers, totalQuestions, navigation, onRestartQuiz, color } = this.props
    return(
      <View style={styles.container}>
        <View>
          <Text style={styles.titleText}>You got {correctAnswers} out of {totalQuestions} questions!</Text>
        </View>
        <TextButton onPress={onRestartQuiz} style={[styles.row, {backgroundColor: color}]}>
          Restart Quiz
        </TextButton>
        <TextButton onPress={() => {navigation.goBack()}} style={[styles.row, {backgroundColor: color}]}>
          Back to Deck
        </TextButton>
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
})

export default QuizScore
