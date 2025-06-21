import * as SQLite from 'expo-sqlite';   

/*Se instancia única de la BD con la API WebSQL */
const dbPromise = SQLite.openDatabaseSync('events.db');

export type EventType = {
  id:    string;
  title: string;
  notes?: string;
  date:  string;  
  hour:  number;  
};

/*Se crea la tabla de los eventos si no existe */
export async function initDB(): Promise<void>{
  const db = await dbPromise;
  db.transaction(tx => {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS events (
        id    TEXT    PRIMARY KEY NOT NULL,
        title TEXT    NOT NULL,
        notes TEXT,
        date  TEXT    NOT NULL,
        hour  INTEGER NOT NULL
      );
    `);
  });
}

/*Se inserta o se reemplaza los eventos */
export async function saveEventLocally(
  id: string,
  title: string,
  notes: string,
  date: string,
  hour: number
): Promise<void> {
  const db = await dbPromise;
  await db.runAsync(
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
  const db = await dbPromise;
  const rows = await db.getAllAsync<EventType>(
    `SELECT id, title, notes, date, hour
     FROM events
     WHERE date = ?;`,
    date
  );
  return rows;
}

/*Actualiza un evento */
export async function updateEventLocally(
  id:    string,
  title: string,
  notes: string,
  date:  string,
  hour:  number
): Promise<void> {
  const db = await dbPromise;
  await db.runAsync(
    `UPDATE events
        SET title = ?, notes = ?, date = ?, hour = ?
      WHERE id    = ?;`,
    title, notes, date, hour, id
  );
}

/* Borra un evento */
export async function deleteEventLocally(id: string): Promise<void> {
  const db = await dbPromise;
  await db.runAsync(
    `DELETE FROM events WHERE id = ?;`,
    id
  );
}