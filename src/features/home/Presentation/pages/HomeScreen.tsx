import { View, StyleSheet, Text } from "react-native";
import HomeHeader from "../components/organisms/HomeHeader";
import DaySelector, { generateWeekDays, DayItem } from "../components/molecules/DaySelector";
import TaskCard from '../components/molecules/TaskCard';

/*Navegación */
import type { CalendarStackParamList } from "../../../calendar/presentation/navigation/types/types";
import { CompositeNavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../../../../navigation/tabs/types/TabsType";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useState } from "react";
import { useCalendarStore } from "../../../calendar/presentation/viewmodel/calendarStore";
import { ScrollView } from "react-native-gesture-handler";


/*Se combinan el tab y el stack anidado */
type NavProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, "Home">,
  NativeStackNavigationProp<CalendarStackParamList>
>;

export default function HomeScreen() {
  const navigation = useNavigation<NavProp>();

  /*Se generan los días */
  const days: DayItem[] = generateWeekDays();

  /*Se guardan el DayItem completo */
  const [selectedDay, setSelectedDay] = useState<DayItem>(
    days.find(d => d.isToday) || days[0]
  );

  /*Se subscribe a los eventos del store de calendar */
  const events = useCalendarStore((s) => s.events);
  const loadEvents = useCalendarStore((s) => s.loadEvents);

  /*Si cambia el día seleccionado, recarga los eventos */
  useFocusEffect(
    useCallback(() => {
      loadEvents(selectedDay.isoDate);
    }, [selectedDay.isoDate])
  );

  /*Al seleccionar navega */
  const handleSelectDate = (day: DayItem) => {
    setSelectedDay(day);
    navigation.navigate("CalendarTab", {
      screen: "DayViewScreen",
      params: { date: day.isoDate },
    });
  };

  /*Permite ordenar los eventos por hora */
  const sortedEvents = [...events].sort((a, b) => a.hour - b.hour);
  {/*Control de la hora por grupos */ }
  let prevHour: number | null = null;

  return (
    <View style={styles.container}>
      <HomeHeader />
      <DaySelector
        days={days}
        selectedDate={selectedDay.isoDate}
        onSelectDate={handleSelectDate}
      />
      {sortedEvents.length === 0 ? (
        <Text style={styles.noEvents}>No hay eventos para este día</Text>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
        >
          {sortedEvents.map(evt => {
            const showTime = evt.hour !== prevHour;
            prevHour = evt.hour;
          return (
              <TaskCard
                key={evt.id}
                time={`${evt.hour.toString().padStart(2, "0")}:00`}
                title={evt.title}
                description={evt.notes}
                color="#93BFCF"
                showTime={showTime}
                onPress={() =>
                  navigation.navigate("CalendarTab", {
                    screen: "DayViewScreen",
                    params: {
                      date: selectedDay.isoDate,
                      initialHour: evt.hour,
                      editingEvent: evt,
                    },
                  })
                }
              />
            );
          })}
        </ScrollView>
      )}
    </View>
  );
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
  scroll: { 
    flex: 1, 
    marginTop: 8 
  },
  scrollContent: { 
    paddingBottom: 100 
  },
});