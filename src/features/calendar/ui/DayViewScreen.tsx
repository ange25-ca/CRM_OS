import { RouteProp, useRoute } from "@react-navigation/native";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, } from "react-native";
import { CalendarStackParamList } from "../../../navigation/stacks/types/types";
import { useEffect, useMemo, useRef, useState } from "react";
import * as Calendar from "expo-calendar"
import { getEventsForDay } from "../data/calendarService";
import AddEventForm from "../components/molecules/AddEventForm";
import ReactNativeModal from "react-native-modal";


/*Se define el tipo especifico de la ruta */
type DayViewRouteProp = RouteProp<CalendarStackParamList, 'DayViewScreen'>;

export default function DayViewScreen() {

  /*Recibe la fecha como parámetro */
  const route = useRoute<DayViewRouteProp>();
  const { date } = route.params;

  const [events, setEvents] = useState<Calendar.Event[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  /*Lista de las horas del día */
  const hours = Array.from({ length: 15 }, (_, i) => 7 + i);

  /*Se crea el evento para la fecha seleccionada */
  const loadEvents = async () => {
    const loadEvents = await getEventsForDay(date);
    setEvents(loadEvents);
  };

  useEffect(() => {
    loadEvents();
  }, [date]);

  /*Operaciones con el modal */
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Agenda para {date}</Text>
      {/*Lista que muestra la hora por día */}
      <FlatList
        data={hours}
        keyExtractor={(hour) => hour.toString()}
        renderItem={({ item: hour }) => {
          const matchingEvent = events.find(event =>
            new Date(event.startDate).getHours() === hour
          );
          return (
            <View style={styles.hourBlock}>
              <Text style={styles.hourText}>
                {hour.toString().padStart(2, "0")}:00
              </Text>
              {matchingEvent && (
                <View style={styles.eventBox}>
                  <Text style={styles.eventTitle}>{matchingEvent.title}</Text>
                </View>
              )}
            </View>
          );
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Botton de agregar */}
      <TouchableOpacity
        style={styles.fab}
        onPress={openModal} >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/*Modal */}
      <ReactNativeModal
        isVisible={modalVisible}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        swipeDirection="down"
        onSwipeComplete={closeModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <AddEventForm
            date={date}
            onSuccess={() => {
              closeModal();
              loadEvents();
            }}
          />
        </View>
      </ReactNativeModal>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  hourBlock: {
    height: 60,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  hourText: {
    fontSize: 16,
    color: "#333",
  },
  eventBox: {
    backgroundColor: "#93BFCF",
    padding: 6,
    borderRadius: 6,
    marginTop: 4,
  },
  eventTitle: {
    color: "#fff",
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    bottom: 32,
    right: 24,
    backgroundColor: "#6096B4",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  fabText: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: "40%",
  },

});
