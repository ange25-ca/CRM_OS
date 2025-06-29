import { createEventForDate } from "../service/calendarService";
import { saveEventLocally } from "./calendarDb";

// Función que primero intenta SQLite, luego expo-calendar si SQLite falla
export async function saveEventWithFallback(
  id: string,
  title: string,
  notes: string,
  date: string,
  hour: number
): Promise<void> {
  try {
    await saveEventLocally(id, title, notes, date, hour);
  } catch (error) {
    console.warn('SQLite falló, se guardará en calendario nativo:', error);
    try {
      await createEventForDate(date, title, notes, hour);
    } catch (calendarError) {
      console.warn('Fallo al guardar en calendario nativo también:', calendarError);
    }
  }
}
