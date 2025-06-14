import * as Calendar from 'expo-calendar'

/*Se agrega el tipo isHidden a calendar */
type ExtendedCalendar = Calendar.Calendar & { isHidden?: boolean};


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
  if(!calendarId) return [];

  /*Se crea el rango de fechas */
  const start = new Date(dateString);
  const end = new Date(dateString);
  end.setHours(23, 59, 59, 999); 

  return Calendar.getEventsAsync([calendarId], start, end);
}