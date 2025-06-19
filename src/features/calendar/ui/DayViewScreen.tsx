import { RouteProp, useRoute } from "@react-navigation/native";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, } from "react-native";
import { CalendarStackParamList } from "../../../navigation/stacks/types/types";
import {  useEffect, useState } from "react";
import AddEventForm from "../components/molecules/AddEventForm";
import ReactNativeModal from "react-native-modal";
import { useCalendarStore } from "../store/calendarStore";
import React from "react";


/*Se define el tipo especifico de la ruta */
type DayViewRouteProp = RouteProp<CalendarStackParamList, 'DayViewScreen'>;

export default function DayViewScreen() {

  /*Recibe la fecha como parámetro */
  const route = useRoute<DayViewRouteProp>();
  const { date } = route.params;

  /*Se usa el store para los eventos */
  const events = useCalendarStore(state => state.events);
  const loadEvents = useCalendarStore(state => state.loadEvents);
  const addEvent = useCalendarStore(state => state.addEvent);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHour, setSelectedHour] = useState<number | undefined>(undefined);

  /*Lista de las horas del día */
  const hours = Array.from({ length: 15 }, (_, i) => 7 + i);
  const hourItems = hours.map(hour => ({
    hour,
    events: events.filter(e => e.hour === hour)
  }));


  /*Se cambia exclusivamente cuando cambia la fecha*/
  useEffect(() => {
   loadEvents(date);
  }, [date]);

  /*Operaciones con el modal */
  const openModal = (hour?: number) => {
    setSelectedHour(hour);
    setModalVisible(true);
  };
  const closeModal = () => {
    setSelectedHour(undefined);
    setModalVisible(false)};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Agenda para {date}</Text>
      {/*Lista que muestra la hora por día */}
      <FlatList
        data={hourItems}
        keyExtractor={item => item.hour.toString()}
        renderItem={({ item}) => (
            <TouchableOpacity 
              onPress={() => openModal(item.hour)}
                style={styles.hourBlock}
            >
              <Text style={styles.hourText}>
                {item.hour.toString().padStart(2, "0")}:00
              </Text>
              {item.events.map(events => (
                <View key={events.id} style={styles.eventBox}>
                 <Text style={styles.eventTitle}>{events.title}</Text> 
                </View>
              ))}
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Botton de agregar */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => openModal(
            new Date().getHours()
          )} >
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
            hour={selectedHour}
            onSuccess={() => {
              closeModal();
              loadEvents(date);
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
