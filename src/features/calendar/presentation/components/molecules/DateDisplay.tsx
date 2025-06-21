import React from 'react'
import { Text, StyleSheet } from 'react-native'

/*Muestra la fecha seleccionada */
export function DateDisplay({ date }: { date: string }) {
  return <Text style={styles.text}> Fecha: {date}</Text>
}

const styles = StyleSheet.create({
  text: { 
    marginTop: 8, 
    fontStyle: 'italic' }
})
