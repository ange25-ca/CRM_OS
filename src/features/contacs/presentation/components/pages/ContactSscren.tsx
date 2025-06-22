
import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, Button, StyleSheet } from 'react-native';
import ContactItem from '../organisms/ContactItem';
import { useContactsStore } from '../../viewmodel/useContacsStore';

export default function ContactsScreen() {
  const { granted, contacts, loading, syncAndLoad } = useContactsStore();

  /*Se montan los contactos  */
  useEffect(() => {
    (async () => {
      try {
        await syncAndLoad();
      } catch (err: any) {
        Alert.alert('Error', err.message || 'No autorizado');
      }
    })();
  }, [syncAndLoad]);

  /*Verificación del permiso */
  if (granted === null || loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!granted) {
    return (
      <View style={styles.center}>
        <Text>Permiso de contactos denegado.</Text>
        <Button
          title="Pedir permiso"
          onPress={() =>
            syncAndLoad().catch((err: any) =>
              Alert.alert('Error', err.message || 'No autorizado')
            )
          }
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(c) => c.id}
        renderItem={({ item }) => <ContactItem contact={item} />}
        ListEmptyComponent={<Text style={styles.empty}>— vacío —</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center:{ 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  container: { 
    flex: 1 
  },
  empty:{ 
    margin: 20, 
    textAlign: 'center' 
  },
});
