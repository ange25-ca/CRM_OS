
/*Se define la estructura basica de un contacto */
export interface Contact {
  /*Identificar unico */
  id: string;
  /*Nombre */
  name: string;
  /*Telefono ceular (opcional)*/
  phone?: string | null;
  /*Email (opcional) */
  email?: string | null;
}