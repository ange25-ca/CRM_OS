/*Se tipan la los parametros de la navegación */
export type CalendarStackParamList = {
  CalendarScreen: undefined;
  DayViewScreen:  { 
    /*Debe de recibir la fecha */
    date: string};
};
