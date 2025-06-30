
/*Se tipa la regla */
export interface Regla<T> {
  nombre: string;
  /*Función que se devuelve de un score */
  evaluar(entidad: T): number;  
}

/*Arreglo intern */
const registro: Regla<any>[] = [];

/*Se realiza la función que implementa la regla */
export function registrar<T>(regla: Regla<T>) {
  /*Se convierte en <any> debido a que se almacenen los tipos */
  registro.push(regla as Regla<any>);
}

/*Permita evaluar las reglas refistradas como la entidad - objeto */
export function evaluar<T>(entidad: T): Record<string,number> {
  return registro
  /*Se incluye un filtro de tipo */
    .filter(r => true)
  /*Se convierte en objeto*/
    .reduce((acc, r) => ({ 
      /*Cada clave es un nombre */
      ...acc, [r.nombre]: 
      /*Se evalua sobre la entidad */
      r.evaluar(entidad) }), {});
}
