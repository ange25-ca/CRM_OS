import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useContactsStore } from '../../viewmodel/useContacsStore';

/*Se definene las prop del componente */
type Props = {
  visible: boolean;
  onClose: () => void;
  onCreated?: () => void;
};

/*Se cre la función para el modal */
export default function NewContactModal({ visible, onClose, onCreated }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const addContact = useContactsStore(state => state.addContact);

  const handleSave = async () => {
    if (!name.trim()) return;
    const id = Date.now().toString();
    addContact({ name, phone });
    onCreated?.();
    setName('');
    setPhone('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>New Contact</Text>
          <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName} />
          <TextInput placeholder="Phone" style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <View style={styles.actions}>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.text}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancel]} onPress={onClose}>
              <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { 
    flex: 1, 
    justifyContent: 'center', 
    backgroundColor: 'rgba(0,0,0,0.3)' 
},
  modal: { 
    backgroundColor: 'white', 
    margin: 20, padding: 20, 
    borderRadius: 12, 
    elevation: 5 
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold',
    marginBottom: 12 
  },
  input: { 
    borderBottomWidth: 1, 
    marginBottom: 12, 
    paddingVertical: 4 
  },
  actions: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  button: { 
    padding: 10, 
    backgroundColor: '#6096B4', 
    borderRadius: 8, 
    marginTop: 10 
  },
  cancel: { 
    backgroundColor: '#ccc' 
  },
  text: { 
    color: '#fff', 
    fontWeight: 'bold' 
  }
});
