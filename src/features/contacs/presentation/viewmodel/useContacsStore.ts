import { create } from 'zustand';
import * as DB from '../../data/persistence/contactsDb';
import * as Service from '../../data/service/contactsService';
import { Contact } from '../../domain/entities/Contact';
import { usePermissionsStore } from '../../../settings/Permissions/infra/permissionsStore';
import {
  addExpoContact,
  updateExpoContact,
  deleteExpoContact,
} from '../../data/service/contactsService';


type ContactsState = {
  contacts: Contact[];
  loading: boolean;
  /*inicializa la base de datos */
  init: () => Promise<void>;
  /*Marca de sincronizacíon completa  */
  syncAndLoad: () => Promise<void>;
  /*Verificación del permiso */
  checkPermission: () => Promise<void>;
  updateContact: (id: string, data: { name: string; phone: string }) => void;


  /*Tags */
  tagsByContactId: Record<string, string[]>;
  addTag: (cid: string, tag: string) => void;
  removeTag: (cid: string, tag: string) => void;
  updateTag: (cid: string, oldT: string, newT: string) => void;

  // Para relación
  relationByContactId: Record<string, string>;
  setRelation: (cid: string, relation: string) => void;

  /*Para eliminar */
  deleteContact: (id: string) => Promise<void>;
  /*Agregar el contacto */
  addContact: (contact: Omit<Contact, 'id'>) => Promise<void>;


};

export const useContactsStore = create<ContactsState>((set, get) => ({
  /*Se inicializa los varoles de la interface */
  contacts: [],
  loading: false,
  granted: null,
  tagsByContactId: {},

  init: async () => {
    /*Se inicia la base de datos local */
    await DB.initContactsDB();
  },

  /*Gestiona la verificacion de los permisos */
  checkPermission: async () => {
    const { check, request, statuses } = usePermissionsStore.getState();
    await check('contacts');
    if (!statuses['contacts']) {
      await request('contacts');
    }
    /*Valida el permiso */
    if (!usePermissionsStore.getState().statuses['contacts']) {
      throw new Error('Permiso de contactos denegado');
    }
  },

  syncAndLoad: async () => {
    set({ loading: true });
    try {
      await get().init();
      /*Verifica permisos */
      await usePermissionsStore.getState().check('contacts');
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
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  /*Permite añadir las tags */
  addTag: (cid, tag) =>
    set(s => ({
      tagsByContactId: {
        ...s.tagsByContactId,
        [cid]: [...(s.tagsByContactId[cid] || []), tag],
      },
    })),

  /*Remover la tag */
  removeTag: (cid, tag) =>
    set(s => ({
      tagsByContactId: {
        ...s.tagsByContactId,
        [cid]: s.tagsByContactId[cid].filter(t => t !== tag),
      },
    })),

  /*Actualiza las tags */
  updateTag: (cid, oldT, newT) =>
    set(s => ({
      tagsByContactId: {
        ...s.tagsByContactId,
        [cid]: s.tagsByContactId[cid].map(t => (t === oldT ? newT : t)),
      },
    })),

  // Estado y acción para relación
  relationByContactId: {},
  setRelation: (cid, relation) =>
    set(s => ({
      relationByContactId: {
        ...s.relationByContactId,
        [cid]: relation,
      },
    })),

  deleteContact: async (id) => {
    try {
      await deleteExpoContact(id);
      await DB.deleteContact(id);
      set((s) => ({
        contacts: s.contacts.filter(c => c.id !== id),
      }));
    } catch (error) {
      console.warn('Error al eliminar contacto:', error);
      throw error;
    }
  },


  /*Agrega contacto */
  addContact: async (contactWithoutId) => {
    try {
      /*Se genera el ID atravez de expo */
      const id = await addExpoContact(contactWithoutId); 
      const newContact: Contact = { ...contactWithoutId, id };
      /*Se intenta agregar en SQLite */
      await DB.saveContact(newContact); 

      set(state => ({
        contacts: [...state.contacts, newContact],
      }));
    } catch (error) {
      console.warn('Error al agregar contacto:', error);
      throw error;
    }
  },

  updateContact: async (id, { name, phone }) => {
    try {
      await updateExpoContact({ id, name, phone }); 
      await DB.saveContact({ id, name, phone });    

      set(s => ({
        contacts: s.contacts.map(c =>
          c.id === id ? { ...c, name, phone } : c
        ),
      }));
    } catch (error) {
      console.warn('Error al actualizar contacto:', error);
      throw error;
    }
  },
}));
