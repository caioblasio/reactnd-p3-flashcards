import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'
import { bgColors, purple, white } from '../../../utils/colors'
import { Ionicons } from '@expo/vector-icons'
import FlipCard from 'react-native-flip-card'

function AnswerBtn ({ onPress, text, bgColor }) {
  return (
    <TouchableOpacity
      style={[styles.answerBtn, { backgroundColor: bgColor }]}
      onPress={onPress}>
        <Text style={styles.answerBtnText}>{text}</Text>
    </TouchableOpacity>
  )
}

class QuestionCard extends Component {

  state = {
    isFlipped: false
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
  }

  flip() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }

    if (!this.timer) {
      this.timer = setTimeout(() => {
        this.setState({isFlipped: !this.state.isFlipped})
        this.timer = null
      }, 100)
    }
  }

  onAnswerPress = (answer) => {
    const { onNextQuestion } = this.props
    onNextQuestion(answer)
  }

  render(){
    const { questionItem, show } = this.props

    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate}
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }

    if(!show)
      return null
    
    return(
      <View style={styles.container}>
        <View>
        <TouchableOpacity onPress={() => this.flip()}>
          <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
            <Text style={styles.titleText}>{questionItem.question}</Text>
            <View>
              <Ionicons 
                name="ios-sync"
                size={100}
                color={purple}
              />
              <Text>Show Answer</Text>
            </View>
          </Animated.View>
          <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
            <Text style={styles.titleText}>{questionItem.answer}</Text>
            {this.state.isFlipped && 
            <View>
              <AnswerBtn 
                onPress={() => {this.onAnswerPress('correct')}}
                bgColor="green"
                text="Correct"
              />
              <AnswerBtn 
                onPress={() => {this.onAnswerPress('incorrect')}}
                bgColor="red"
                text="incorrect"
              />
            </View>
            }
          </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flipCard: {
    padding: 30,
    borderColor: purple,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  titleText: {
    fontSize: 30,
    lineHeight: 40,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  answerBtn: {
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 25,
  },
  answerBtnText: {
    color: white,
    fontSize: 20,
    textAlign: 'center',
  },
})

export default QuestionCard
