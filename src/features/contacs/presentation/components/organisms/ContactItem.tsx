import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Contact } from '../../../domain/entities/Contact';

export type ContactItemProps = {
  contact: Contact;
  onPress?: (contact: Contact) => void;
};

export default function ContactItem({ contact, onPress }: ContactItemProps) {
  return (
    <TouchableOpacity 
        style={styles.container} onPress={() => onPress?.(contact)}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {contact.name}
        </Text>
          {/*En caso de que haya datos se muestra los iconos(aun no se agregan) */}
        {contact.phone && 
          <Text style={styles.subText}>{contact.phone}</Text>}
        {contact.email && 
          <Text style={styles.subText}>{contact.email}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    marginLeft: 8,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  subText: {
    fontSize: 14,
    marginTop: 4,
    color: '#555',
  },
});
