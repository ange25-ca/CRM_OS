import { RouteProp, useRoute } from "@react-navigation/native";
import { View, Text, FlatList, StyleSheet,} from "react-native";
import { CalendarStackParamList } from "../../../../navigation/stacks/types/types";
import {  useEffect, useState } from "react";
import AddEventForm from "../organisms/AddEventForm";
import ReactNativeModal from "react-native-modal";
import { useCalendarStore } from "../../store/calendarStore";
import React from "react";
import { HourCell } from "../organisms/HourCell";
import { FabButton } from "../atoms/FabButton";
import { EventType } from "../../data/calendarDb";
import { EventItem } from "../molecules/EventItem";


/*Se define el tipo especifico de la ruta */
type DayViewRouteProp = RouteProp<CalendarStackParamList, 'DayViewScreen'>;

export default function DayViewScreen() {

  /*Recibe la fecha como parámetro */
  const route = useRoute<DayViewRouteProp>();
  const { date } = route.params;

  /*Se usa el store para los eventos */
  const events = useCalendarStore(state => state.events);
  const loadEvents = useCalendarStore(state => state.loadEvents);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHour, setSelectedHour] = useState<number | undefined>(undefined);
  const [editingEvent, setEditingEvent] = useState<EventType |null>(null);

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
  const openModal = (hour?: number, eventToEdit?: EventType) => {
    setSelectedHour(hour);
    setEditingEvent(eventToEdit ?? null);
    setModalVisible(true);
  };
  const closeModal = () => {
    setSelectedHour(undefined);
    setModalVisible(false);
    setEditingEvent(null);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Agenda para {date}</Text>
      {/*Lista que muestra la hora por día */}
      <FlatList
        data={hourItems}
        keyExtractor={item => item.hour.toString()}
        renderItem={({ item}) => (
          <HourCell 
            hour={item.hour}
            events={item.events}
            onPress={hour =>
              openModal(hour)  
            }
            renderEvent={evt => (
              <EventItem
                key={evt.id}
                event={evt}
                onEdit={() => openModal(item.hour, evt)}
              />
            )}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Botton de agregar */}
        <FabButton 
          onPress={() => openModal(
            new Date().getHours()
          )}
        />

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
            editingEvent={editingEvent!}
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
  hourText: {
    fontSize: 16,
    color: "#333",
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
