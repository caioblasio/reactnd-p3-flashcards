import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'
import { green, red } from '../../../utils/colors'
import { Ionicons } from '@expo/vector-icons'
import TextButton from '../../TextButton'

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
    const { questionItem, show, color } = this.props

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
          <Animated.View style={[styles.flipCard, frontAnimatedStyle, { borderColor: color }]}>
            <Text style={styles.titleText}>{questionItem.question}</Text>
            <View style={styles.bottomBtn}>
              <Ionicons 
                name="ios-sync"
                size={40}
                color={color}
              />
              <Text style={[styles.bottomBtnText, { color }]}>Show Answer</Text>
            </View>
          </Animated.View>
          <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack, { borderColor: color }]}>
            <Text style={styles.titleText}>{questionItem.answer}</Text>
            {this.state.isFlipped && 
            <View>
              <TextButton 
                onPress={() => {this.onAnswerPress('correct')}}
                style={[styles.row, { backgroundColor: green }]}
              >
              Correct
              </TextButton>
              <TextButton
                onPress={() => {this.onAnswerPress('incorrect')}}
                style={[styles.row, { backgroundColor: red }]}
              >
              Incorrect
              </TextButton>
            </View>
            }
            <View style={styles.bottomBtn}>
              <Ionicons 
                name="ios-sync"
                size={40}
                color={color}
              />
              <Text style={[styles.bottomBtnText, { color }]}>Show Question</Text>
            </View>
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
  row: {
    marginTop: 25,
  },
  flipCard: {
    padding: 30,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    height: 420
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
  bottomBtn: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottomBtnText: {
    fontSize: 20,
    marginLeft: 5,
  },
})

export default QuestionCard
