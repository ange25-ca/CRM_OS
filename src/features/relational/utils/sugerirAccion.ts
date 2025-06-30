import { evaluar } from '../engine'
import type { Contacto } from '../entities/contacto'

const pesos = { recencia: 0.5, frecuencia: 0.3, importancia: 0.2 }

/*Se realiza el mapeo */
const siguientePorTipo: Record<string, string> = {
  llamada:  'Enviar mensaje',
  email:    'Llamar ahora',
  mensaje:  'Programar reunión',
  reunión:  'Enviar mensaje',
}

export function sugerirAccion(c: Contacto): string {
  /*En caso de que se tenga interacciones, sugiere el siguiente conforme la logica */
  const last = c.interacciones.at(-1)?.tipo
  if (last && siguientePorTipo[last]) {
    return siguientePorTipo[last]
  }

  /*En caso de que no tenga se realiza el scrore */
  const s = evaluar(c)
  const total =
    s.recencia   * pesos.recencia +
    s.frecuencia * pesos.frecuencia +
    s.importancia* pesos.importancia
  /*Score ponderado */
  if (total > 0.75) return 'Llamar ahora'
  if (total > 0.5)  return 'Enviar mensaje'
  return 'Programar recordatorio'
}
