import { create } from "zustand";
import { deleteEventLocally, EventType, getLocalEventsByDate, saveEventLocally, updateEventLocally } from "../../data/persistence/calendarDb";
import { usePermissionsStore } from "../../../settings/Permissions/infra/permissionsStore";
import { createEventForDate, deleteEventNative, getEventsForDay, updateEventNative } from "../../data/service/calendarService";


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

        let localEvents: EventType[] = [];

        /*Se intenta obtener los datos de SQLite primero */
        try {
            localEvents = await getLocalEventsByDate(date);
        } catch (error) {
            /*console.warn('Error al obtener eventos desde SQLite:', error);*/
        }

        /*Se obtiene los eventos del calendario nativo */
        let nativeEvents: EventType[] = [];
        try {
            const calendarEvents = await getEventsForDay(date);
            nativeEvents = calendarEvents.map(event => ({
                id: event.id,
                title: event.title,
                notes: event.notes ?? '',
                date: new Date(event.startDate).toISOString().split('T')[0],
                hour: new Date(event.startDate).getHours(),
            }));
        } catch (error) {
            console.error('Error al obtener eventos desde calendario nativo:', error);
        }

        // Combinamos ambos resultados claramente
        const combinedEvents = [...localEvents, ...nativeEvents];

        set({ events: combinedEvents });
    },
    /*Crea un evento en el calendario nativo y lo guarda localmente */
    addEvent: async (date, title, notes, hour) => {
        /*Asegura los permisos de expo-calendar */
        const { check, request, statuses } = usePermissionsStore.getState();
        await check("calendar");
        if (!statuses["calendar"]) {
            await request("calendar");
        }
        if (!usePermissionsStore.getState().statuses["calendar"]) {
            throw new Error("Permiso del calendario denegado");
        }
        /*Crea el evento en expo-calendar */
        const eventId = await createEventForDate(date, title, notes, hour);
        /*Guarda una copia en SQLite */
        await saveEventLocally(eventId, title, notes, date, hour);
        /*Se recarga el estado */
        await get().loadEvents(date);
    },
    /*Actualiza el calendario */
    updateEvent: async ({ id, title, notes = '', date, hour }) => {
        /*Verifica los permisos */
        const { check, request, statuses } = usePermissionsStore.getState();
        await check("calendar");
        if (!statuses["calendar"]) {
            await request("calendar");
        }
        if (!usePermissionsStore.getState().statuses["calendar"]) {
            throw new Error("Permiso del calendario denegado");
        }
        /*Actualiza en el calendario expo*/
        await updateEventNative(id, title, notes, date, hour);
        /* Actualiza el calendario local( SQLite )*/
        try {
            await updateEventLocally(id, title, notes, date, hour);
        } catch (err) {
            console.warn('No se encontró el evento en SQLite para actualizarlo:', err);
        }

        /*Refresca la vista */
        await get().loadEvents(date);

    },

    deleteEvent: async (id, date) => {
        const { check, request, statuses } = usePermissionsStore.getState();
        await check("calendar");
        if (!statuses["calendar"]) {
            await request("calendar");
        }
        if (!usePermissionsStore.getState().statuses["calendar"]) {
            throw new Error("Permiso del calendario denegado");
        }

        try {
            await deleteEventNative(id);
            console.log('✅ Evento eliminado del calendario nativo');
        } catch (error) {
            console.warn('⚠️ No se pudo eliminar del calendario nativo:', error);
        }

        try {
            await deleteEventLocally(id);
            console.log('✅ Evento eliminado de SQLite');
        } catch (error) {
            console.warn('⚠️ No se pudo eliminar de SQLite (probablemente no existía):', error);
        }

        await get().loadEvents(date);
    }
}))