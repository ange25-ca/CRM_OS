import React from 'react'
import { View, Text, TextInput, StyleSheet, TextInputProps , StyleProp, TextStyle} from 'react-native'

interface FormFieldProps extends Omit<TextInputProps, 'onChangeText'> {
  label: string
  value: string
  onChangeText: (text: string) => void
  /*Estilo extra para el TextInput*/
  inputStyle?: StyleProp<TextStyle>
}

export function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  inputStyle,
  ...rest
}: FormFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[styles.input, inputStyle]}
        {...rest}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { 
    marginBottom: 12 
  },
  label:{ 
    marginBottom: 4, 
    fontWeight: 'bold' 
  },
  input: {
    borderWidth: 1, 
    borderColor: '#ccc',
    borderRadius: 4, 
    padding: 8
  }
})
