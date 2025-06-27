import { EventType } from "../../../data/persistence/calendarDb";

/*Se tipan la los parametros de la navegación */
export type CalendarStackParamList = {
  CalendarScreen: undefined;
  DayViewScreen:  { 
    /*Debe de recibir la fecha */
    date: string;
    /*Hora al seleccionar */
    initialHour?: number;
    /*Evento a editar */
    editingEvent?: EventType;
  }
};
