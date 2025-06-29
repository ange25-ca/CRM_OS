import * as Contacts from 'expo-contacts';
import { PermissionEntity } from './permission';

/*Función que permite pedir el permiso de la Api contact */
export const ContactsPermission: PermissionEntity = {
  id: 'contacts',
  label: 'Acceso a Contactos',
  check: async () => {
    const { status } = await Contacts.getPermissionsAsync();
    return status === 'granted';
  },
  request: async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    return status === 'granted';
  },
};