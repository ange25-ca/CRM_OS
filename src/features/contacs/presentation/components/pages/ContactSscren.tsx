import React, { useEffect } from 'react'
import { View, Text, FlatList, ActivityIndicator, Alert, Button, StyleSheet, TouchableOpacity, } from 'react-native'
import { useContactsStore } from '../../viewmodel/useContacsStore';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ContactStackParamList } from '../../navigation/types/type';
import { Ionicons } from '@expo/vector-icons';
import TagAtom from '../atoms/TagAtom';

/*Se declara el tipo de navegación para los detalles del contacto */
type NavProp = NativeStackNavigationProp<ContactStackParamList,'ContactDetailScreen'>

export default function ContactsScreen() {
  const {granted, contacts, loading, syncAndLoad, relationByContactId, } = useContactsStore()

  const navigation = useNavigation<NavProp>()

  /*Se navega hacía detalles del contacto */
  const handlePressContact = (contactId: string) => {
    navigation.navigate('ContactDetailScreen', { contactId })
  }

  /*Alerta del permiso para cargar los contactos */
  useEffect(() => {
    syncAndLoad().catch(err =>
      Alert.alert('Error', err.message || 'No autorizado'),
    )
  }, [syncAndLoad])

  /*Icono de carga ... en caso de estar comprobando los permisos */
  if (granted === null || loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    )
  }

  /*En caso de no contar con los permisos se agrega un botón */
  if (!granted) {
    return (
      <View style={styles.center}>
        <Text>Permiso de contactos denegado.</Text>
        <Button
          title="Pedir permiso"
          onPress={() =>
            syncAndLoad().catch(err =>
              Alert.alert('Error', err.message || 'No autorizado'),
            )
          }
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={contacts}
        keyExtractor={c => c.id}
        renderItem={({ item }) => {
          const relation = relationByContactId[item.id]
          return (
            <TouchableOpacity
              style={styles.item}
              activeOpacity={0.7}
              onPress={() => handlePressContact(item.id)}
            >
              <View>
                <Ionicons
                  name="person-circle-outline"
                  size={40}
                  color="#6096B4"
                  style={styles.icon}
                />
              </View>
              {/* información del contacto */}
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                {item.phone && (
                  <Text style={styles.phone}>{item.phone}</Text>
                )}
              </View>
              {/*La etiqueta (relación) de cada contacto */}
              {relation && (
                <TagAtom
                  tag={relation}
                />
              )}
            </TouchableOpacity>
          )
        }}
        /*Altura que separa a los contactos */
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        /*En caso de no haya ningun contacto se muestra un texto vacio */
        ListEmptyComponent={<Text style={styles.empty}>— vacío —</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  list: {
    flex: 1
  },
  listContent: {
    paddingVertical: 8,
    paddingBottom: 100,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333'
  },
  sep: {
    height: 8
  },
  empty: {
    marginTop: 32,
    textAlign: 'center',
    color: '#666'
  },
  icon: {
    marginRight: 12,
  },
  phone: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
})
