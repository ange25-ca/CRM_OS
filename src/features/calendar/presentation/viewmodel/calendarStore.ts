import { create } from "zustand";
import { deleteEventLocally, EventType, getLocalEventsByDate, saveEventLocally, updateEventLocally } from "../../data/persistence/calendarDb";
import { usePermissionsStore } from "../../../../stores/permissionsStore";
import { createEventForDate, deleteEventNative, updateEventNative } from "../../data/service/calendarService";


/*Se crea la interfaz de los eventos */
interface CalendarState {
    events: EventType[];
    loadEvents: (date: string) => Promise<void>;
    addEvent: (
        date: string,
        title: string,
        notes: string,
        hour: number
    ) => Promise<void>;
    updateEvent: (event: EventType) => Promise<void>;
    deleteEvent: (id: string, date: string) => Promise<void>;
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
    events: [],

    /*Se carga los eventos de SQLite por la fecha */
    loadEvents: async (date: string) => {
        /*Limpia el array */
        set({ events: [] });
        /*Obtiene los nuevos datos */
        const local = await getLocalEventsByDate(date);
        set({ events: local });
    },
    /*Crea un evento en el calendario nativo y lo guarda localmente */
    addEvent: async (date, title, notes, hour) => {
        /*Asegura los permisos de expo-calendar */
        const ensure = usePermissionsStore.getState().ensureCalendarPermission;
        await ensure();

        /*Crea el evento en expo-calendar */
        const eventId = await createEventForDate(date, title, notes, hour);

        /*Guarda una copia en SQLite */
        await saveEventLocally(eventId, title, notes, date, hour);

        /*Se recarga el estado */
        await get().loadEvents(date);
    },
    /*Actualiza el calendario */
    updateEvent: async ({ id, title, notes = '', date, hour }) => {
        const ensure = usePermissionsStore.getState().ensureCalendarPermission;
        await ensure();

        /*Actualiza en el calendario expo*/
        await updateEventNative(id, title, notes, date, hour);
        /* Actualiza el calendario local( SQLite )*/
        await updateEventLocally(id, title, notes, date, hour);
        /*Recarga la lista */
        await get().loadEvents(date);
    },

    deleteEvent: async (id, date) => {
        const ensure = usePermissionsStore.getState().ensureCalendarPermission;
        await ensure();

        /*Borra del calendario de expo*/
        await deleteEventNative(id);
        /*Borra del calendario local */
        await deleteEventLocally(id);
        /*Recarga la lista */
        await get().loadEvents(date);
    }
}))