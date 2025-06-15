import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import CalendarView from "../components/organisms/CalendarView";
import { getEventsForDay } from "../data/calendarService";
import { addEventForDate } from "../domain/calendarUseCases";
import { usePermissionsStore } from "../../../stores/permissionsStore";

export default function CalendarScreen() {

  /*Constantes que permiten manejar la fecha seleccionada*/
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  /*Eventos reales del calendario nativo */
  const [events, setEvents] = useState<any[]>([]);
  const [eventDates, setEventDates] = useState<string[]>([]);

  /*Se carga los eventos al cambiar la fecha seleccionada */
  useEffect(() => {
    if (!selectedDate) return;
    (async () => {
      const eventsForDay = await getEventsForDay(selectedDate);
      setEvents(eventsForDay);

      /*Se añade la fecha si tiene eventos */
      if (eventsForDay.length > 0) {
        setEventDates((prev) =>
          prev.includes(selectedDate) ? prev : [...prev, selectedDate]);
      }
    })();
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      {/* Se integra el organismo con la vista del calendario */}
      <CalendarView
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        /*Se agrega el evento */
        eventDates={eventDates}
      />
    </View>
  )
}

// Estilos del la vista
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  }
});