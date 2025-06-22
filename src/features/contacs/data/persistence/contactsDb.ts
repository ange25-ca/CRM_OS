import * as SQLite from 'expo-sqlite';
import { Contact } from '../../domain/entities/Contact';

async function getDB() {
  /*Se abre o crea la base de datos de los contactos */
  return await SQLite.openDatabaseAsync('contacts.db');
}

/*Se inicializa la tabla de contactos (si no existe) */
export async function initContactsDB(): Promise<void> {
  const db = await getDB();
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS contacts (
       id    TEXT PRIMARY KEY NOT NULL,
       name  TEXT NOT NULL,
       phone TEXT,
       email TEXT
     );`
  );
}

/*Se inserta o reemplaza el contacto */
export async function saveContact(c: Contact): Promise<void> {
  const db = await getDB();
  await db.runAsync(
    `INSERT OR REPLACE INTO contacts (id, name, phone, email)
     VALUES (?, ?, ?, ?);`,
    c.id,
    c.name,
    c.phone ?? null,
    c.email ?? null
  );
}

/*Devuelve todos los contactos de la base de datos contactos*/
export async function loadAllContacts(): Promise<Contact[]> {
  const db = await getDB();
  /*Se devuelve en un array */
  const rows = await db.getAllAsync<Contact>(`SELECT * FROM contacts;`);
  return rows;
}
