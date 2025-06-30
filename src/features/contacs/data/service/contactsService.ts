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
    id: c.id,
    name: c.name ?? '— sin nombre —',
    phone: c.phoneNumbers?.[0]?.number ?? null,
    email: c.emails?.[0]?.email ?? null,
  }));
}

/*Agrega un contacto */
export async function addExpoContact(contact: {
  name: string;
  phone?: string | null;
  email?: string | null;
}): Promise<string> {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permiso de contactos denegado');
  }

  const contactData: Contacts.Contact = {
    contactType: Contacts.ContactTypes.Person,
    name: contact.name,
    firstName: contact.name,
    phoneNumbers: contact.phone
      ? [{ number: contact.phone, label: 'mobile' }]
      : [],
    emails: contact.email
      ? [{ email: contact.email, label: 'work' }]
      : [],
  };

  const id = await Contacts.addContactAsync(contactData);
  return id;
}

/*Actualiza */
export async function updateExpoContact(contact: Contact): Promise<void> {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permiso de contactos denegado');
  }

  const contactData = {
    id: contact.id,
    contactType: Contacts.ContactTypes.Person,
    name: contact.name,
    firstName: contact.name,
    phoneNumbers: contact.phone
      ? [{ number: contact.phone, label: 'mobile' }]
      : [],
    emails: contact.email
      ? [{ email: contact.email, label: 'work' }]
      : [],
  };

  await Contacts.updateContactAsync(contactData);
}


/* Elimina el contacto */
export async function deleteExpoContact(id: string): Promise<void> {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permiso de contactos denegado');
  }

  await Contacts.removeContactAsync(id);
}