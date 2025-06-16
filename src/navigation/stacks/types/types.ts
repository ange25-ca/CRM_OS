/*Se tipan la los parametros de la navegación */
export type CalendarStackParamList = {
  CalendarScreen: undefined;
  AddEventScreen: {
    /*Debe de recibir la fecha*/
    date: string };
  DayViewScreen:  { 
    /*Debe de recibir la fecha */
    date: string};
};
