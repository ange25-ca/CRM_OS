import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CalendarView from "../components/organisms/CalendarView";

export default function CalendarScreen() {

  /*Constantes que permiten manejar la fecha seleccionada*/
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      {/* Se integra el organismo con la vista del calendario */}
      <CalendarView
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      {/* Muestra la fecha debajo del calendario */}
      {selectedDate && (
        <Text style={styles.dateInfo}>Fecha seleccionada: {selectedDate}</Text>
      )}
    </View>
  )
}

// Estilos del la vista
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  dateInfo: {
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  }
});