import React from 'react'
import { View, StyleSheet } from 'react-native'

export function EventDot() {
  return <View style={styles.dot} />
}

const styles = StyleSheet.create({
  dot: {
    width: 6, height: 6,
    borderRadius: 3,
    backgroundColor: '#93BFCF',
    marginLeft: 4
  }
})
