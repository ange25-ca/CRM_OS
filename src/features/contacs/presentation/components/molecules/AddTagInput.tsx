import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

/*Se definen las propiedades para el componente addTags */
type AddTagInputProps = {
  onAdd: (tag: string) => void;
  placeholder?: string;
};

export default function AddTagInput({onAdd, placeholder = 'Nueva etiqueta'}: AddTagInputProps){
  /* Estado local para alamecenar el input */
  const [value, setValue] = useState('');
  /*Función para agregar */
  const handleAdd = () => {
    /*Permite quitar los espacios al inicio y final */
    const trimmed = value.trim();
    /*Si no esta vacio */
    if (trimmed) {
      /*Pasa la etiqueta */
      onAdd(trimmed);
      setValue('');
    }
  };

  return (
    <View style={styles.container}>
      {/*Se ingresa la etiqueta */}
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        onChangeText={setValue}
        onSubmitEditing={handleAdd}
        returnKeyType="done"
      />
      <TouchableOpacity onPress={handleAdd} style={styles.button}>
        <Text style={styles.buttonText}>Agregar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 8 
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  button: {
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#6096B4',
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontSize: 14 },
});