import * as SQLite from 'expo-sqlite';

/*Se declara la constante para la bd */
const DB_NAME = 'events.db';

/*Abre o se crea la base de datos*/
async function openDB(): Promise<SQLite.SQLiteDatabase> {
  return SQLite.openDatabaseAsync(DB_NAME);  
}
/* Modelo de evento local */
export type EventType = {
  id:    string;
  title: string;
  notes?: string;
  date:  string;
  hour:  number;
};
/*Se crea la tabla si no existe  de los eventos*/
export async function initDB(): Promise<void> {
  const db = await openDB();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS events (
      id    TEXT    PRIMARY KEY NOT NULL,
      title TEXT    NOT NULL,
      notes TEXT,
      date  TEXT    NOT NULL,
      hour  INTEGER
    );
  `);
}
/*Se inserta o se reemplaza los eventos */
export async function saveEventLocally(
  id: string,
  title: string,
  notes: string,
  date: string,
  hour: number
): Promise<SQLite.SQLiteRunResult> {
  const db = await openDB();
  return db.runAsync(
    `INSERT OR REPLACE INTO events (id, title, notes, date, hour)
     VALUES (?, ?, ?, ?, ?);`,
    id,
    title,
    notes,
    date,
    hour
  );  
}
/*Se extraen los eventos existentes */
export async function getLocalEventsByDate(date: string): Promise<EventType[]> {
  const db = await openDB();
  /*Se devuelve una array tipado */
  const events = await db.getAllAsync<EventType>(
    `SELECT id, title, notes, date, hour
     FROM events
     WHERE date = ?;`,
    date
  );
  return events;
}
