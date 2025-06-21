import React from 'react'
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native'

/*Se crea la interfaz para el botton */
interface ButtonAtomProps {
  title:    string
  onPress:  () => void
  style?:   ViewStyle
}


export function ButtonAtom({ title, onPress, style }: ButtonAtomProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor:   '#6096B4',
    paddingVertical:   12,
    paddingHorizontal: 16,
    borderRadius:      6,
    alignItems:        'center'
  },
  text: {
    color:      '#fff',
    fontSize:   16,
    fontWeight: 'bold'
  }
})
