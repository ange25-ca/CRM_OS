import * as Notifications from 'expo-notifications';
import { PermissionEntity } from './permission';

/*Permite pedir los permisos para las notificaciones */
export const NotificationsPermission: PermissionEntity = {
  id: 'notifications',
  label: 'Acceso a Notificaciones',
  check: async () => {
    const { status } = await Notifications.getPermissionsAsync();
    return status === 'granted';
  },
  request: async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  },
};