import * as Calendar from 'expo-calendar';
import { PermissionEntity} from './permission';

/*Se crea la solicitud de permisos para calendar */
export const CalendarPermission: PermissionEntity = {
  id: 'calendar',
  label: 'Acceso al Calendario',
  check: async () => {
    const { status } = await Calendar.getCalendarPermissionsAsync();
    return status === 'granted';
  },
  request: async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    return status === 'granted';
  },
};