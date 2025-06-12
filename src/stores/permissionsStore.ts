import { create } from 'zustand';
import * as Calendar from 'expo-calendar';

/*Se declaran los tipos del estado*/
type PermissionsState = {
    /*Estado del permiso, es decir, si fue conceddo, denegado o aún no se solicita */
    calendarGranted: boolean | null;
    /*Permite solicitar el permiso y actualizar el estado */
    checkCalendarPermission: () => Promise<void>;
};

/* Se crea el store*/
export const usePermissionsStore = create<PermissionsState>((set) => ({
    /*Se declada el estado inicial del calendario */
    calendarGranted: null,
    /*Función que solicita el permiso al sistema */
    checkCalendarPermission: async () => {
        /*Se realiza la slocitud */
        const {status} = await Calendar.requestCalendarPermissionsAsync();
        /*Se actualiza el estado en caso que el permiso haya sido otorgado */
        set({ calendarGranted: status === 'granted'});
    },
}));