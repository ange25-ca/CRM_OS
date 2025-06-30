import { z } from 'zod';

/*Se emplea zod para una iteracción */
export const InteraccionSchema = z.object({
  fecha: z.date(),
  tipo: z.enum([
    'llamada',
    'email',
    'reunión',
    'mensaje'
  ]),
});

/*Se infiere sobre el esquema de zod */
export type Interaccion = z.infer<typeof InteraccionSchema>;

/*Se genera la entidad con el esquema de Zod para la entidad Contacto */
export const ContactoSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  importancia: z.number().min(0).max(10),
  interacciones: z.array(InteraccionSchema),
});

/*Se infiere en el tipo de contacto con el esquema de zod */
export type Contacto = z.infer<typeof ContactoSchema>;
