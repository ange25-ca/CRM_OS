import { create } from "zustand";
import { EventType, getLocalEventsByDate, saveEventLocally } from "../data/calendarDb";
import { usePermissionsStore } from "../../../stores/permissionsStore";
import { createEventForDate } from "../data/calendarService";


/*Se crea la interfaz de los eventos */
interface CalendarState{
    events: EventType[];
    loadEvents: (date: string) => Promise<void>;
    addEvent: (
        date: string,
        title: string,
        notes:string,
        hour:number
    ) => Promise<void>;
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
    events: [],
        
    /*Se carga los eventos de SQLite por la fecha */
    loadEvents: async (date: string)=> {
        /*Limpia el array */
        set({events: []});
        /*Obtiene los nuevos datos */
        const local = await getLocalEventsByDate(date);
          console.log('Eventos locales para', date, local);
        set({events: local});
    },
    /*Crea un evento en el calendario nativo y lo guarda localmente */
    addEvent: async (date, title, notes, hour) => {
        /*Asegura los permisos de expo-calendar */
        const ensure = usePermissionsStore.getState().ensureCalendarPermission;
        await ensure();

        /*Crea el evento en expo-calendar */
        const eventId= await createEventForDate(date, title, notes, hour);

        /*Guarda una copia en SQLite */
        await saveEventLocally(eventId, title, notes, date, hour);

        /*Se recarga el estado */
        await get().loadEvents(date);
    }
}))