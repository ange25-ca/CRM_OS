import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Contact } from '../../../domain/entities/Contact';
import TagList from './TagList';

/*Se define las propiedasdes del componente ContactItemProps */
export type ContactItemProps = {
  contact: Contact;
  onPress?: (contact: Contact) => void;
  /*Seleecion de las relacion */
  selectedRelation?: string;
  onSelectRelation?: (relation:string) => void;
  /*Etiquetas */
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  onUpdateTag: (oldTag: string, newTag: string) => void;
};

export default function ContactItem({ contact, onPress, tags, onAddTag, onRemoveTag, onUpdateTag, selectedRelation, onSelectRelation }: ContactItemProps){
  
  /*Función que pasa el contact atravez de un click */
  const handlePress = (e: GestureResponderEvent) => {
    onPress?.(contact);
  };
  return (
    <View style={styles.card}>
      <TouchableOpacity 
      activeOpacity={0.8}
        style={styles.touchable}
        onPress={handlePress}>
      
      {/*Información */}
      <View style={styles.infoContainer}>
        {/*Se muestra el nombre */}
        <Text style={styles.name}>
          {contact.name}
        </Text>
          {/*Se muestra el numero telefonico) */}
        {contact.phone && 
          <Text style={styles.subText}>{contact.phone}</Text>}
          {/*Se muestra el email */}
        {contact.email && 
          <Text style={styles.subText}>{contact.email}</Text>}
      </View>
      
      {/* Aquí insertas la lista de tags */}
      <TagList
        selectedRelation={selectedRelation}
        onSelectRelation={onSelectRelation!}
        tags={tags}
        onAddTag={onAddTag}
        onRemoveTag={onRemoveTag}
        onUpdateTag={onUpdateTag}
      />

    </TouchableOpacity>
    </View>    
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  touchable: {
    padding: 16,
  },
  infoContainer: {
    marginBottom: 12,
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
