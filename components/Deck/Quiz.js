import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { bgColors, black } from '../../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../../utils/helpers'
import * as Progress from 'react-native-progress';
import QuestionCard from './QuizComponents/QuestionCard'
import QuizScore from './QuizComponents/QuizScore'

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
        backgroundColor: bgColors[index % 4],
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

  //clear notifications if quiz is completed and set another for tomorrow
  componentDidUpdate(){
    const { currentQuestion, totalQuestions } = this.state

    if(currentQuestion === totalQuestions){
      clearLocalNotification()
        .then(setLocalNotification)
    }
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
    const color = bgColors[navigation.state.params.index % 4]

    return(
      <View style={styles.container}>
        {currentQuestion === totalQuestions
          ? (
            <QuizScore
              correctAnswers={correctAnswers}
              totalQuestions={totalQuestions}
              navigation={navigation}
              onRestartQuiz={this.onRestartQuiz}
              color={color}
            />
          ) : (
            <View style={{flex: 1}}>
              <View style={styles.progressContainer}>
                <Text style={styles.progressText}>{currentQuestion + 1}/{totalQuestions}</Text>
                <Progress.Bar color={color} progress={(currentQuestion + 1)/(totalQuestions)} width={null}/>
              </View>
              {questions.map((questionItem, index) =>(
                <QuestionCard 
                  key={index}
                  show={currentQuestion === index}
                  questionItem={questionItem}
                  onNextQuestion={this.onNextQuestion}
                  color={color}
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
    padding: 20,
  },
  progressContainer: {
    marginBottom: 25
  },
  progressText: {
    color: black,
    fontSize: 18,
    lineHeight: 18
  }
})

export default Quiz