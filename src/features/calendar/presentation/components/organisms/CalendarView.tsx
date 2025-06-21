import { CalendarList } from "react-native-calendars";
import Day from "../atoms/Day";

/*Se usan las props que recibe CalendarView */
interface Props {
    selectedDate: string | null;
    onSelectDate: (dateString: string) => void;
    /*Se agrega los eventos, esta puede ser opcional */
    eventDates?: string[];
}

/*Se crea la función con el renderizado con el calendario */
export default function CalendarView({ selectedDate, onSelectDate, eventDates = [] }: Props) {
    return (
        /*Calendario Mensual */
        <CalendarList
            /*Se agregan aspectos visuales del calendario */
            /*Permite scroll izquierdo */
            horizontal={true}
            /*Permite que se desplace como pagina*/
            pagingEnabled={true}
            /*Meses anteriores visibles */
            pastScrollRange={12}
            /*Meses futuros */
            futureScrollRange={12}
            /*Se ocultan las flechas */
            hideArrows={true}
            /*Muestra días de otros meses */
            hideExtraDays={false}

            dayComponent={({ date, state }) => {
                /*En caso de que el valor de la fecha no exista, no renderiza nada */
                if (!date) return null;
                /*Se obtiene la fecha actual que tiene correlación con el dispositivo*/
                const today = new Date();
                const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
                /*Verifica si el día actual del calendario es el que marca el dispositivo */
                const isToday = date.dateString === todayString;
                /*En caso de que sea el dia actual este seleccionado */
                const isSelected = date.dateString === selectedDate;
                /*Permite saber que días son fuera del mes que este seleccionado */
                const isDisabled = state === "disabled";
                /*Se verifica si hay un evento */
                const hasEvents = eventDates.includes(date.dateString);
                /*Retorna todos los valores analizados */
                return (
                    <Day
                        day={date.day}
                        dateString={date.dateString}
                        isToday={isToday}
                        isSelected={isSelected}
                        isDisabled={isDisabled}
                        /*Permite actualizar la fecha seleccionada */
                        onPress={() => onSelectDate(date.dateString)}
                        /*Eventos del día */
                        hasEvents={hasEvents}
                    />
                );
            }}
        />
    );
}