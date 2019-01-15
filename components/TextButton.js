import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { white } from '../utils/colors'

export default function TextButton ({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.submitBtn, style]}>
      <Text style={styles.submitBtnText}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  submitBtn: {
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  submitBtnText: {
    color: white,
    fontSize: 20,
    textAlign: 'center',
  },
})