import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Linking } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContactsStore } from '../../viewmodel/useContacsStore';
import { ContactStackParamList } from '../../navigation/types/type';
import { Ionicons } from '@expo/vector-icons';
import TagList from '../organisms/TagList';
import TextButtonAtom from '../atoms/IconButtonAtom';
import { Contacto, Interaccion } from '../../../../relational/entities/contacto';
import { sugerirAccion } from '../../../../relational/utils/sugerirAccion';
import * as DB from '../../../../contacs/data/persistence/contactsDb';
import ActionsGroup from '../organisms/ActionsGrups';

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
  /*Se separa las tags */
  const tags = tagsByContactId[contactId] ?? [];

  const handleAction = async (tipo: Interaccion['tipo']) => {
    try {
      /*Dispara la acción de cada botón */
      switch (tipo) {
        case 'llamada':
          if (contact.phone) await Linking.openURL(`tel:${contact.phone}`);
          break;
        case 'email':
          if (contact.email) await Linking.openURL(`mailto:${contact.email}`);
          break;
        case 'mensaje':
          if (contact.phone) await Linking.openURL(`sms:${contact.phone}`);
          break;
        case 'reunión':
          if (Platform.OS === 'android') {
            await Linking.openURL(`content://com.android.calendar/time/${Date.now()}`);
          } else {
            // iOS usa calshow: con segundos
            await Linking.openURL(`calshow:${Date.now() / 1000}`);
          }
          break;
      }

      /*Llama la interacción de la bd */
      await DB.saveInteraction(contactId, tipo, new Date());

      /*Recarga las interacciones */
      const inters = await DB.loadInteractions(contactId);
      const ri: Contacto = {
        id: contact.id,
        nombre: contact.name,
        importancia: tagsByContactId[contactId]?.length ?? 0,
        interacciones: inters,
      };
      const nueva = sugerirAccion(ri);

      /*Actualiza el store y vuelve a la pagina de contactos general */
      setRelation(contactId, nueva);
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', 'No se pudo ejecutar la acción.');
    }
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
        {/*Botón para las Acciones */}
        <ActionsGroup onAction={handleAction} />
        {/* Botón Guardar */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>GUARDAR</Text>
        </TouchableOpacity>
        <TextButtonAtom
          title="ELIMINAR"
          backgroundColor="#B00020"
          onPress={() => {
            Alert.alert(
              'Eliminar contacto',
              '¿Estás seguro de que deseas eliminar este contacto?',
              [
                { text: 'Cancelar', style: 'cancel' },
                {
                  text: 'Eliminar',
                  style: 'destructive',
                  onPress: () => {
                    useContactsStore.getState().deleteContact(contactId);
                    navigation.goBack();
                  },
                },
              ]
            );
          }}
        />

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
  tags: {
    paddingHorizontal: 8
  },
  icon: {
    fontSize: 125,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  actionBtn: {
    backgroundColor: '#6096B4',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: 70
  },
  actionTxt: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center'
  },
  sugerencia: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginVertical: 12,
    textAlign: 'center'
  },
});
