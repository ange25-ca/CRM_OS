import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, Button, StyleSheet } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function ContactsTestScreen() {
  const [hasPermission, setHasPermission] = useState<boolean|null>(null);
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      /*Solicita el permiso */
      const { status } = await Contacts.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'No podemos acceder a tus contactos');
      }
    })();
  }, []);

  /*Función que muestra los eventos con permiso */
  const loadContacts = async () => {
    if (!hasPermission) return;
    setLoading(true);
    try {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
        pageSize: 50,
        sort: Contacts.SortTypes.FirstName,
      });
      setContacts(data);
    } catch {
      Alert.alert('Error', 'No se pudieron cargar los contactos');
    } finally {
      setLoading(false);
    }
  };

  if (hasPermission === null) {
    return <ActivityIndicator style={styles.center}/>;
  }
  if (hasPermission === false) {
    return (
      <View style={styles.center}>
        <Text>Sin permiso para leer contactos.</Text>
        <Button title="Pedir permiso" onPress={loadContacts} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Cargar contactos" onPress={loadContacts} />
      {loading && <ActivityIndicator style={{ marginTop: 10 }} />}
      {contacts.length === 0 && !loading ? (
        <Text style={{ marginTop: 10 }}>— ningún contacto —</Text>
      ) : (
        <FlatList
          style={{ marginTop: 10 }}
          data={contacts}
          keyExtractor={c => c.id!}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.name}>{item.name}</Text>
              {item.phoneNumbers?.[0] && 
                <Text>{item.phoneNumbers[0].number}</Text>}
              {item.emails?.[0] && 
                <Text>{item.emails[0].email}</Text>}
            </View>
          )}
        />
      )}
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
    flex: 1, 
    padding: 16 
},
  item:{
    padding: 12, 
    borderBottomWidth: 1, 
    borderColor: '#ccc' },
  name:{ 
    fontSize: 16, 
    fontWeight: '600' },
});
