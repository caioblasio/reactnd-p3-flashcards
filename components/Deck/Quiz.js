import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { bgColors, purple, white } from '../../utils/colors'
import * as Progress from 'react-native-progress';
import QuestionCard from './QuizComponents/QuestionCard'

class Quiz extends Component {

  state = {
    questions: [],
    correctAnswers: 0,
    totalQuestions: 0,
    currentQuestion: 0
  }

  static navigationOptions = ({ navigation }) => {
    const { index } = navigation.state.params
    return {
      title: 'Quiz',
      headerStyle: {
        backgroundColor: bgColors[index % 2],
      }
    }
  }

  componentDidMount() {
    const { deck } = this.props.navigation.state.params
    this.setState({ 
      questions: deck.questions,
      totalQuestions: deck.questions.length,
    })
  }

  onNextQuestion = (answer) => {
    this.setState((currentState) => ({
      correctAnswers: answer === 'correct' ? currentState.correctAnswers + 1 : currentState.correctAnswers,
      currentQuestion: currentState.currentQuestion + 1
    }))
  }

  onRestartQuiz = () => {
    this.setState({
      currentQuestion: 0,
      correctAnswers: 0
    })
  }

  render(){
    const { questions, currentQuestion, totalQuestions, correctAnswers } = this.state
    const { navigation } = this.props
    return(
      <View style={styles.container}>
        {currentQuestion === totalQuestions
          ? (
            <View style={{flex: 1}}>
              <Text>Resultado: {Math.round(correctAnswers/totalQuestions * 100).toFixed(2)}</Text>
              <TouchableOpacity onPress={() => {this.onRestartQuiz()}}>
                <Text>Restart Quiz</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {navigation.goBack()}}>
                <Text>Back to Deck</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{flex: 1}}>
              <View style={styles.progressContainer}>
                <Text style={styles.progressText}>{currentQuestion}/{totalQuestions}</Text>
                <Progress.Bar color={purple}  progress={(currentQuestion + 1)/(totalQuestions + 1)} width={null}/>
              </View>
              {questions.map((questionItem, index) =>(
                <QuestionCard 
                  key={index}
                  show={currentQuestion === index}
                  questionItem={questionItem}
                  onNextQuestion={this.onNextQuestion}
                />
              ))}
            </View>
          )
        }
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  progressContainer: {
    marginBottom: 25
  },
  progressText: {
    color: purple,
    fontSize: 18,
    lineHeight: 18
  }
})

export default Quiz