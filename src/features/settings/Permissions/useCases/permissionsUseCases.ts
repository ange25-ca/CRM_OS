// src/features/settings/permissions/useCases/permissionsUseCases.ts
import * as Notifications from 'expo-notifications';
import { allPermissions } from '../domain/permissionRegistry';

/*Solicita el permiso */
export async function checkPermission(id: string): Promise<boolean> {
    const perm = allPermissions.find(p => p.id === id);
    if (!perm) throw new Error(`Permiso desconocido: ${id}`);
    // perm.check() retorna Promise<boolean|null>
    const result = await perm.check();
    /*En caso de que sea nulo se trata como falso */
    return result ?? false;
}

/*Permite que devuelva un boobleano*/
export async function requestPermission(id: string): Promise<boolean> {
    const perm = allPermissions.find(p => p.id === id);
    /*El permiso puede ser desconocido */
    if (!perm) throw new Error(`Permiso desconocido: ${id}`);
    const result = await perm.request();
    return result ?? false;
}

/* Para cada permiso rechazado, programa un recordatorio si han pasado menos de 3 días desde el último prompt y sólo hasta 3 intentos */
export async function evaluateAndScheduleReminders(
    statuses: Record<string, boolean | null>,
    meta: Record<string, { lastPrompt: Date | null; attempts: number }>
) {
    const now = Date.now();
    for (const perm of allPermissions) {
        const state = statuses[perm.id];
        const m = meta[perm.id];
        if (state === false && m.lastPrompt) {
            const days = (now - m.lastPrompt.getTime()) / (1000 * 60 * 60 * 24);
            if (days > 3 && m.attempts < 3) {
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: `Permiso pendiente: ${perm.label}`,
                        body: `Recuerda activar ${perm.label.toLowerCase()}.`
                    },
                    trigger: {
                        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                        seconds: 5,
                        repeats: false,
                    },
                });
            }
        }
    }
}
