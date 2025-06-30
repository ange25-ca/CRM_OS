/*Motor para las reglas */

/*Interfaz que define la estructura de la regla */
export interface Regla<T> {
  /*Nombre unicio que identifica la regla */
  nombre: string;
  /*Expresa el grado de relevancia del score */
  evaluar(entidad: T): number;  
}

/*Registro interno de las reglas */
const registro: Regla<any>[] = [];

/*Funcion que permite registrar la nueva regla en el motor */
export function registrar<T>(regla: Regla<T>) {
  registro.push(regla as Regla<any>);
}

/*Aplica las reglas registradas*/
export function evaluar<T>(entidad: T): Record<string,number> {
  return registro
    /*Se puede filtrar por tipo de entidad */
    .filter(r => true)
    /*Se reduce el array a un objeto */
    .reduce((acc, r) => ({ 
      /*Nombre */
      ...acc, [r.nombre]:
      /*Puntuación */
       r.evaluar(entidad) }), {});
}
