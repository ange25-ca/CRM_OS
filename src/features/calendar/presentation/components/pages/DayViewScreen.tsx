import { CompositeNavigationProp, RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";
import { View, Text, FlatList, StyleSheet, } from "react-native";
import { CalendarStackParamList } from "../../navigation/types/types";
import { useCallback, useEffect, useState } from "react";
import AddEventForm from "../organisms/AddEventForm";
import ReactNativeModal from "react-native-modal";
import { useCalendarStore } from "../../viewmodel/calendarStore";
import React from "react";
import { HourCell } from "../organisms/HourCell";
import { FabButton } from "../atoms/FabButton";
import { EventType } from "../../../data/persistence/calendarDb";
import { EventItem } from "../molecules/EventItem";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabParamList } from "../../../../../navigation/tabs/types/TabsType";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";



/*Se define el tipo especifico de la ruta */
type DayViewRouteProp = RouteProp<
  CalendarStackParamList, 'DayViewScreen'>;

type DayViewNavProp = CompositeNavigationProp<
  NativeStackNavigationProp<CalendarStackParamList, 'DayViewScreen'>,
  BottomTabNavigationProp<TabParamList, 'CalendarTab'>
>;

export default function DayViewScreen() {

  /*Recibe los parametros*/
  const { date, initialHour, editingEvent: routEvent } = useRoute<DayViewRouteProp>().params;

  /*Navegación hacia settings */
  const navigation = useNavigation<DayViewNavProp>();

  /*Se usa el store para los eventos */
  const events = useCalendarStore(state => state.events);
  const loadEvents = useCalendarStore(state => state.loadEvents);

  /*Modal */
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHour, setSelectedHour] = useState<number | undefined>(undefined);
  const [editingEvent, setEditingEvent] = useState<EventType | null>(null);

  /*Lista de las horas del día */
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const hourItems = hours.map(hour => ({
    hour,
    events: events.filter(e => e.hour === hour)
  }));


  /*Se cambia exclusivamente cuando cambia la fecha*/
  useEffect(() => {
    loadEvents(date);
    if (routEvent) {
      setSelectedHour(initialHour);
      setEditingEvent(routEvent);
      setModalVisible(true);
    }
  }, [date, initialHour, routEvent, loadEvents]);

  useFocusEffect(
    useCallback(() => {
      loadEvents(date);
    }, [date])
  );

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
        renderItem={({ item }) => (
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
            editingEvent={editingEvent ?? undefined}
            onSuccess={() => {
              closeModal();
              loadEvents(date);
            }}
            onPermissionDenied={() => {
              /*Se redirecciona a Settings */
              const tabNav = navigation.getParent<BottomTabNavigationProp<TabParamList>>();
              tabNav?.navigate('SettingsScreen');
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
