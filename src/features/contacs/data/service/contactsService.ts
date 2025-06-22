import * as Contacts from 'expo-contacts';
import { Contact } from '../../domain/entities/Contact';

export async function fetchExpoContacts(): Promise<Contact[]> {
  /*Se realiza la solicitud de permisos */
  const { status } = await Contacts.requestPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permiso de contactos denegado');
  }
  /*Obtención de contactos */
  const { data } = await Contacts.getContactsAsync({
    fields: [
      Contacts.Fields.PhoneNumbers, 
      Contacts.Fields.Emails],
    sort: Contacts.SortTypes.FirstName,
    pageSize: 500,
  });
  /*Se filtran los contactos que son validos */
  const valid = data.filter(
    (c): c is Contacts.Contact & { id: string } => typeof c.id === 'string'
  );
  
  return valid.map(c => ({
    id:    c.id,
    name:  c.name  ?? '— sin nombre —',
    phone: c.phoneNumbers?.[0]?.number ?? null,
    email: c.emails?.[0]?.email       ?? null,
  }));
}