import * as Calendar from 'expo-calendar'
import { Platform } from 'react-native';

/*Se agrega el tipo isHidden a calendar */
type ExtendedCalendar = Calendar.Calendar & { isHidden?: boolean };


/* Función para obtener los eventos por día */
export async function getEventsForDay(dateString: string): Promise<Calendar.Event[]> {
  /*Se obtiene los calendarios */
  const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
  /* Se le comunica que un cast puede tener un isHidden */
  const usableCalendars = calendars as ExtendedCalendar[];

  /*Se busca el primer calendario que no esté oculto*/
  const calendarId = usableCalendars.find(cal => !cal.isHidden)?.id ??
    usableCalendars[0]?.id;

  /*En caso de no haber, se retorna un array vacio */
  if (!calendarId) return [];

  /*Se crea el rango de fechas */
  const start = new Date(dateString);
  const end = new Date(dateString);
  end.setHours(23, 59, 59, 999);

  return Calendar.getEventsAsync([calendarId], start, end);
}

/*Se crea la función para crear eventos por día */
export async function createEventForDate(
  dateString: string,
  title: string,
  notes?: string,
  hour?: number
) {

  /*Se obtiene los calendarios disponibles*/
  const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);

  const usableCalendars = calendars as ExtendedCalendar[];

  /*Se busca el calendario visible */
  let calendarId =
    usableCalendars.find(cal => cal.allowsModifications && !cal.isHidden)?.id ??
    usableCalendars.find(
      (cal) => cal.allowsModifications
    )?.id;

  /*En caso de no encontrar un calendario valido se crea uno de forma local */
  if (!calendarId) {
    let calendarSource: Calendar.Source;
    /*Para IOS */
    if (Platform.OS === 'ios') {
      const defaultCalendar = await Calendar.getDefaultCalendarAsync();
      calendarSource = defaultCalendar.source;
    } else {
      /*Para android se crea uno local por defecto */
      calendarSource = {
        isLocalAccount: true,
        name: 'Calendario local',
        type: 'local',
      };
    }

    calendarId = await Calendar.createCalendarAsync({
      title: "Eventos App",
      color: '#93BFCF',
      entityType: Calendar.EntityTypes.EVENT,
      source: calendarSource,
      name: 'Calendario de la App',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
  }

  // Creamos fecha de inicio a las 10:00 AM y fin a las 11:00 AM
  const start = new Date(dateString);
  start.setHours(hour ?? 10, 0);
  const end = new Date(start.getTime() + 60 * 60 * 1000);

  // Creamos el evento con zona horaria local
  return await Calendar.createEventAsync(calendarId, {
    title,
    notes,
    startDate: start,
    endDate: end,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

}

/*Funcion para actualizar un evento existente */
export async function updateEventNative(
  id:    string,
  title: string,
  notes: string,
  date:  string,
  hour:  number
): Promise<void> {
  const [y, m, d] = date.split('-').map(Number);
  const start = new Date(y, m - 1, d, hour);
  const end   = new Date(start.getTime() + 60 * 60 * 1000);

  await Calendar.updateEventAsync(id, {
    title,
    notes,
    startDate: start,
    endDate:   end,
    timeZone:  Intl.DateTimeFormat().resolvedOptions().timeZone
  });
}

/*Función para borrar un evento del calendario nativo */
export async function deleteEventNative(eventId: string): Promise<void> {
  await Calendar.deleteEventAsync(eventId);
}