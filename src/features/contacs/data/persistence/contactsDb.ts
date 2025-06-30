import * as SQLite from 'expo-sqlite';
import { Contact } from '../../domain/entities/Contact';

let dbInstance: SQLite.SQLiteDatabase | null = null;

async function getDB(): Promise<SQLite.SQLiteDatabase> {
  if (!dbInstance) {
    try {
      dbInstance = await SQLite.openDatabaseAsync('contacts.db');
    } catch (error) {
      console.warn('Error abriendo la base de datos:', error);
      throw error;
    }
  }
  return dbInstance;
}

/*Se inicializa la tabla de contactos (si no existe) */
export async function initContactsDB(): Promise<void> {
  const db = await getDB()
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS contacts (
       id    TEXT PRIMARY KEY NOT NULL,
       name  TEXT NOT NULL,
       phone TEXT,
       email TEXT,
       relation TEXT,
       tags   TEXT
     );`
  );
}

/*Se inserta o reemplaza el contacto */
export async function saveContact(c: Contact & { relation?: string; tags?: string[] }): Promise<void> {
  const db = await getDB();
  await db.runAsync(
    `INSERT OR REPLACE INTO contacts
       (id, name, phone, email, relation, tags)
     VALUES (?, ?, ?, ?, ?, ?);`,
    c.id,
    c.name,
    c.phone ?? null,
    c.email ?? null,
    c.relation ?? null,
    c.tags ? JSON.stringify(c.tags) : null
  );
}

/*Devuelve todos los contactos de la base de datos contactos*/
export async function loadAllContacts(): Promise<(Contact & { relation?: string; tags?: string[] })[]> {
  const db = await getDB();
  const rows = await db.getAllAsync<any>(`SELECT * FROM contacts;`);
  return rows.map(r => ({
    id:       r.id,
    name:     r.name,
    phone:    r.phone,
    email:    r.email,
    relation: r.relation ?? undefined,
    tags:     r.tags ? JSON.parse(r.tags) : []
  }));
}

export async function updateContact(
  id: string,
  fields: { name?: string; phone?: string; email?: string; relation?: string; tags?: string[] }
): Promise<void> {
  const db = await getDB();
  const sets: string[] = [];
  const params: any[] = [];
  if (fields.name   !== undefined) { sets.push("name = ?");    params.push(fields.name); }
  if (fields.phone  !== undefined) { sets.push("phone = ?");   params.push(fields.phone); }
  if (fields.email  !== undefined) { sets.push("email = ?");   params.push(fields.email); }
  if (fields.relation !== undefined) { sets.push("relation = ?"); params.push(fields.relation); }
  if (fields.tags   !== undefined) {
    sets.push("tags = ?");
    params.push(JSON.stringify(fields.tags));
  }
  if (sets.length === 0) return;

  const sql = `UPDATE contacts SET ${sets.join(", ")} WHERE id = ?;`;
  await db.runAsync(sql, ...params, id);
}

export async function deleteContact(id: string): Promise<void> {
  const db = await getDB();
  await db.runAsync(`DELETE FROM contacts WHERE id = ?;`, id);
}
