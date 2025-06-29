export type PermissionStatus = boolean | null;

/*Se crea la interfaz que recibira cada componente que se decee tener permisos */
export interface PermissionEntity {
  id: string;             
  label: string;   
  /*Lee el status */         
  check: () => Promise<PermissionStatus>;  
  /*Solicitud */    
  request: () => Promise<PermissionStatus>;    
}
