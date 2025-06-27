import React, { useState } from 'react';
import { View, StyleSheet, Modal, TextInput, Button, Text, ScrollView } from 'react-native';
import AddTagInput from '../molecules/AddTagInput';
import TagAtom from '../atoms/TagAtom';

/*Se crea la interfaz de las tags */
type TagListProps = {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  onUpdateTag: (oldTag: string, newTag: string) => void;
  /*Seleccion de la relación*/
  selectedRelation?: string;
  onSelectRelation?: (relation: string) => void;
};

export default function TagList({
  tags, onAddTag, onRemoveTag, onUpdateTag, selectedRelation, onSelectRelation, }: TagListProps) {

  /*Se coloca las relaciones fijas */
  const defaultRelations = ['Familia', 'Trabajo', 'Amigos'];
  /*Estados para la edición de la etiqueta */
  const [editingTag, setEditingTag] = useState<string | null>(null);
  const [editedValue, setEditedValue] = useState('');

  return (
    <View>
      <Text style={styles.sectionTitle}>Relación:</Text>
      {/*Lista de las relaciones */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagsRow}
      >
        {defaultRelations.map(rel => (
          <TagAtom
            key={rel}
            tag={rel}
            selected={selectedRelation === rel}
            onPress={onSelectRelation}
          />
        ))}
      </ScrollView>
      {/*Las etiquetas son libres y se pueden editar */}
      <Text style={styles.sectionTitle}>Etiquetas:</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagsRow}
      >
        {/*Se itera sobre las tags */}
        {tags.map(tag => (
          <TagAtom
            key={tag}
            tag={tag}
            onRemove={onRemoveTag}
            onEdit={t => {
              setEditingTag(t);
              setEditedValue(t);
            }}
          />
        ))}

      </ScrollView>

      {/*Se añade una etiqueta */}
      <AddTagInput onAdd={onAddTag} />

      {/* Modal edición */}
      <Modal visible={!!editingTag} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar etiqueta</Text>
            <TextInput
              style={styles.input}
              value={editedValue}
              onChangeText={setEditedValue}
            />
            <Button
              title="Guardar"
              onPress={() => {
                if (editingTag && editedValue.trim()) {
                  onUpdateTag(editingTag, editedValue.trim());
                }
                setEditingTag(null);
              }}
            />
            <Button
              title="Cancelar"
              onPress={() => setEditingTag(null)}
              color="#888"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginTop: 8,
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  tagsRow: {
    paddingVertical: 4,
  },
  modalBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
  },
});
