import { View, StyleSheet, Text} from "react-native";
import HomeHeader from "../components/organisms/HomeHeader";
import DaySelector, {generateWeekDays, DayItem} from "../components/molecules/DaySelector";
import TaskCard from '../components/molecules/TaskCard';

/*Navegación */
import type { CalendarStackParamList } from "../../../../navigation/stacks/types/types";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../../../../navigation/tabs/types/TabsType";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import TestNotification from "../components/TestNotification";
import { useCalendarStore } from "../../../calendar/presentation/viewmodel/calendarStore";


/*Se combinan el tab y el stack anidado */
type NavProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, "Home">,
  NativeStackNavigationProp<CalendarStackParamList>
>;

export default function HomeScreen(){
  const navigation = useNavigation<NavProp>();

  /*Se generan los días */
  const days: DayItem[] = generateWeekDays();

  /*Se guardan el DayItem completo */
  const [selectedDay, setSelectedDay]= useState<DayItem>(
    days.find(d => d.isToday) || days[0]
  );

  /*Se subscribe a los eventos del store de calendar */
  const events = useCalendarStore((s) => s.events);
  const loadEvents = useCalendarStore((s) => s.loadEvents);

  /*Si cambia el día seleccionado, recarga los eventos */
  useEffect(() => {
    loadEvents(selectedDay.isoDate);
  }, [selectedDay.isoDate]);

  /*Al seleccionar navega */
  const handleSelectDate = (day: DayItem) => {
    setSelectedDay(day);
    navigation.navigate("CalendarTab", {
      screen: "DayViewScreen",
      params: { date: day.isoDate },
    });
  };

  return (
    <View style={styles.container}>
      <HomeHeader />
      <DaySelector 
        days={days}
        selectedDate={selectedDay.isoDate}
        onSelectDate={handleSelectDate}
      />
      {events.length === 0 ? (
        <Text style={styles.noEvents}>No hay eventos para este día</Text>
      ): (
        events.map((evt) => (
          <TaskCard
            key={evt.id}
            time={`${evt.hour}:00`}        // o formatea como prefieras
            title={evt.title}
            description={evt.notes}
            // podrías elegir un color según tipo, prioridad, etc.
            color="#93BFCF"
          />
        ))
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30
  },
  noEvents: {
    marginTop: 20,
    textAlign: "center",
    color: "#666",
  },
});