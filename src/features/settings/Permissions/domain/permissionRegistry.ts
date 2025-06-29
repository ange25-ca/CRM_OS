import { CalendarPermission } from "./calendarPermission";
import { ContactsPermission } from "./contactsPermission";
import { NotificationsPermission } from "./notificationsPermission";
import { PermissionEntity } from "./permission";

/*Por ahora solo tres Apis requieren permisos */
export const allPermissions: PermissionEntity[] = [
  CalendarPermission,
  ContactsPermission,
  NotificationsPermission,
];

