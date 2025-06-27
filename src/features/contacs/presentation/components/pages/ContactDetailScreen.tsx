import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContactsStore } from '../../viewmodel/useContacsStore';
import { ContactStackParamList } from '../../navigation/types/type';
import { Ionicons } from '@expo/vector-icons';
import TagList from '../organisms/TagList';

/*Se declara el tipo de navegación */
type Props = NativeStackScreenProps<ContactStackParamList, 'ContactDetailScreen'>;

export default function ContactDetailScreen({ route, navigation }: Props) {
  const { contactId } = route.params;
  /*Propiedades de un contacto */
  const { contacts, updateContact, tagsByContactId, addTag, removeTag, updateTag, relationByContactId, setRelation } = useContactsStore();

  /*Se optiene los contactos actuales por id*/
  const contact = contacts.find(c => c.id === contactId)!;

  /*Variables para la edición de los contactos */
  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone || '');

  useEffect(() => {
    navigation.setOptions({ title: `Editar: ${contact.name}` });
  }, []);

  /*Funcion que permite guardar los cambios del contacto */
  const handleSave = () => {
    updateContact(contactId, { name, phone });
    Alert.alert('Guardado', 'Los cambios se han guardado.');
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}                             
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} 
  >
    <ScrollView
      style={styles.screenContent}
      contentContainerStyle={{ 
        flexGrow: 1,                
        padding: 16, 
        paddingBottom: 40 
      }}
      keyboardShouldPersistTaps="handled"  
    >
        {/* Avatar con inicial */}
        <View style={styles.avatarWrapper}>
          <View >
            <Ionicons
              name="person-circle-outline"
              size={40}
              color="#176874"
              style={styles.icon}
            />
          </View>
        </View>

        {/* Card de datos */}
        <View style={styles.card}>
          {/* Nombre */}
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Nombre</Text>
            <TextInput
              style={styles.cardInput}
              value={name}
              onChangeText={setName}
              placeholder="Nombre"
            />
          </View>
          <View style={styles.divider} />
          {/* Teléfono */}
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Teléfono</Text>
            <TextInput
              style={styles.cardInput}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder="Teléfono"
            />
          </View>
        </View>

        {/* Relacion y etiquetas */}
        <View style={styles.tags}>
          <TagList
            selectedRelation={relationByContactId[contactId]}
            onSelectRelation={rel => setRelation(contactId, rel)}
            tags={tagsByContactId[contactId] ?? []}
            onAddTag={tag => addTag(contactId, tag)}
            onRemoveTag={tag => removeTag(contactId, tag)}
            onUpdateTag={(o, n) => updateTag(contactId, o, n)}
          />
        </View>

        {/* Botón Guardar */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>GUARDAR</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  screenContent: {
    flex: 1, 
    backgroundColor: '#FFF'
  },
  avatarWrapper: {
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  cardLabel: {
    flex: 1.2,
    fontSize: 14,
    color: '#555',
  },
  cardInput: {
    flex: 2,
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginHorizontal: 16,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 110,
    borderRadius: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  tags:{
    paddingHorizontal: 8
  },
  icon: {
    fontSize: 125,
  },
});
