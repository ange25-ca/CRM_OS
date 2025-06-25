import { create } from 'zustand';
import * as Calendar from 'expo-calendar';
import * as Contacts from 'expo-contacts';
import * as Notifications from "expo-notifications";


/*Se declaran los tipos del estado*/
type PermissionsState = {
    /*Estado del permiso, es decir, si fue conceddo, denegado o aún no se solicita */
    calendarGranted: boolean | null;
    contactsGranted: boolean | null;
    notificationsGranted: boolean | null;

    /*Permite solicitar el permiso y actualizar el estado */
    checkCalendarPermission: () => Promise<void>;
    ensureCalendarPermission: () => Promise<void>;

    /** Permite solicitar, asegurar y actualizar el estado*/
    checkContactsPermission: () => Promise<void>;
    ensureContactsPermission: () => Promise<void>;

    /* Permite solicitar el permiso de las notificaciones */
    checkNotificationsPermission: () => Promise<void>;
    ensureNotificationsPermission: () => Promise<void>;

};

/* Se crea el store*/
export const usePermissionsStore = create<PermissionsState>((set, get) => ({
    /*Se declada el estado inicial del calendario */
    calendarGranted: null,
    /*Se declara el estado inicial de los contactos */
    contactsGranted: null,
    /*Se declara el estado de las notificaciones */
    notificationsGranted: null,

    /*Función que solicita el permiso al sistema */
    checkCalendarPermission: async () => {
        /*Se realiza la slocitud */
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        /*Se actualiza el estado en caso que el permiso haya sido otorgado */
        set({ calendarGranted: status === 'granted' });
    },
    /*Permite confirmar el permiso */
    ensureCalendarPermission: async () => {
        const granted = get().calendarGranted;
        if (granted === null) {
            await get().checkCalendarPermission();
        }

        if (!get().calendarGranted) {
            throw new Error("Permiso del calendario denegado")
        }
    },

    /*Contacs */
    checkContactsPermission: async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        set({ contactsGranted: status === 'granted' });
    },
    ensureContactsPermission: async () => {
        if (get().contactsGranted === null) {
            await get().checkContactsPermission();
        }
        if (!get().contactsGranted) {
            throw new Error('Permiso de contactos denegado');
        }
    },

    /*Notificaciones */
    checkNotificationsPermission: async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        set({ notificationsGranted: status === "granted" });
    },

    ensureNotificationsPermission: async () => {
        const granted = get().notificationsGranted;
        if (granted === null) {
            await get().checkNotificationsPermission();
        }
        if (!get().notificationsGranted) {
            throw new Error("Permiso de notificaciones denegado");
        }
    },

}));