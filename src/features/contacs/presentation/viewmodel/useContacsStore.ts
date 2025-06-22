import { create } from 'zustand';
import * as DB from '../../data/persistence/contactsDb';
import * as Service from '../../data/service/contactsService';
import { Contact } from '../../domain/entities/Contact';
import { usePermissionsStore } from '../../../../stores/permissionsStore';

type ContactsState = {
  contacts: Contact[];
  loading: boolean;
  /*inicializa la base de datos */
  init: () => Promise<void>;
  /*Marca de sincronizacíon completa  */
  syncAndLoad: () => Promise<void>;
  /*Estado del permiso */
  granted: boolean | null;  
  /*Verificación del permiso */
  checkPermission:() => Promise<void>;

};

export const useContactsStore = create<ContactsState>((set, get) => ({
  /*Se inicializa los varoles de la interface */
  contacts: [],
  loading: false,
  granted:null,

  init: async () => {
    /*Se inicia la base de datos local */
    await DB.initContactsDB();
  },

  /*Gestiona la verificacion de los permisos */
  checkPermission: async () => {
    try {
      await usePermissionsStore
        .getState()
        .ensureContactsPermission();
        /*Permiso concedido */
      set({ granted: true });
    } catch {
      /*Permiso denegado */
      set({ granted: false });
      throw new Error('Permiso de contactos denegado');
    }
  },

  syncAndLoad: async () => {
    set({ loading: true });
    try {
      await get().init();
      /*Verifica permisos */
      await get().checkPermission();
      /*Obtiene el contacto de los dispositivos */
      const expoList = await Service.fetchExpoContacts();
      /*Lo guarda en SQLie */
      await Promise.all(expoList.map(c => DB.saveContact(c)));
      /*Lee los coontactos desde SQLite */
      const saved = await DB.loadAllContacts();

      /*Actualiza */
      set({ contacts: saved });
    } catch (err) {
      console.error('Error sincronizando contactos:', err);
    } finally {
      set({ loading: false });
    }
  },
}));
