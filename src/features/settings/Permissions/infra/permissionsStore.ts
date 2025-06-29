import { create } from 'zustand';
import { allPermissions } from '../domain/permissionRegistry';
import { checkPermission, evaluateAndScheduleReminders, requestPermission } from '../useCases/permissionsUseCases';

/*Son los datos del utimo prompt y el numero de intentos */
type Meta = { lastPrompt: Date | null; attempts: number };
/*Status de los permisos */
type Statuses = Record<string, boolean>;
type Metas    = Record<string, Meta>;

/*Se define los componentes del del store global */
interface PermissionsState {
  /*Estados actuales */
  statuses: Statuses;
  /*Datos de cada permiso */
  meta: Metas;
  /*Comprueba los permisos */
  check: (id: string) => Promise<void>;
  /*Solicita los permisos */
  request: (id: string) => Promise<void>;
  /*Evalua y programa  recordatorios*/
  evaluate: () => Promise<void>;
}

/*Se cre al store */
export const usePermissionsStore = create<PermissionsState>((set, get) => {
  /*Se inicia todos los permisos en false */
  const initialStatuses = Object.fromEntries(
    allPermissions.map(p => [p.id, false])
  );
  /*Se inicial los datos de intentos en 0 */
  const initialMeta = Object.fromEntries(
    allPermissions.map(p => [p.id, { lastPrompt: null, attempts: 0 }])
  );

  return {
    /*Se reactivan los permisos */
    statuses: initialStatuses,
    /*Ultimo intento */
    meta: initialMeta,
    /*Se comprueba el permiso  */
    check: async (id) => {
      /*Emple del useCase para permiso de expo */
      const granted = await checkPermission(id);
      /*Se actualiza el estado */
      set(state => ({
        statuses: { 
          ...state.statuses, 
          [id]: granted 
        },
        meta: {
          ...state.meta,
          [id]: {
            /*Se marca cuando se solicito el permiso */
            lastPrompt: new Date(),
            /*Se aumenta el contador */
            attempts: state.meta[id].attempts + 1
          }
        }
      }));
    },

      /*Solicita por medio del id el permiso al usuario */
    request: async (id) => {
      /*Empleo del caso de uso*/
      const granted = await requestPermission(id);
      set(state => ({
        /*Se actualiza el estado */
        statuses: { 
          ...state.statuses, 
          [id]: granted 
        },
        meta: {
          ...state.meta,
          [id]: {
            lastPrompt: new Date(),
            attempts: state.meta[id].attempts + 1
          }
        }
      }));
    },

    /*Revisa todos los permisos y programa recordatorios si están denegados */
    evaluate: async () => {
      /*Se usa el estado acctual */
      const { statuses, meta } = get();
      /*Cada que se compara fechas se intenta programar notificaciones */
      await evaluateAndScheduleReminders(statuses, meta);
    }
  };
});