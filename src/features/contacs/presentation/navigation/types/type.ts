
/*Se declara las vistas para navegación */
export type ContactStackParamList = {
  ContacScreen: undefined;
  ContactDetailScreen:  { 
    /*Debe de recibir el Id del contacto */
    contactId: string};
};