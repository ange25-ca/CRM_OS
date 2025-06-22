/*Se tipan la los parametros de la navegación */
export type CalendarStackParamList = {
  Home: undefined;
  CalendarScreen: undefined;
  DayViewScreen:  { 
    /*Debe de recibir la fecha */
    date: string};
};
