import { View, StyleSheet} from "react-native";
import HomeHeader from "../components/organisms/HomeHeader";
import DaySelector, {generateWeekDays, DayItem} from "../components/molecules/DaySelector";
import TaskCard from '../components/molecules/TaskCard';

/*Navegación */
import type { CalendarStackParamList } from "../../../../navigation/stacks/types/types";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../../../../navigation/tabs/types/TabsType";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";


/*Se combinan el tab y el stack anidado */
type NavProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, "Home">,
  NativeStackNavigationProp<CalendarStackParamList>
>;

export default function HomeScreen(){
  const navigation = useNavigation<NavProp>();

  const days: DayItem[] = generateWeekDays();
  const [selectedDay, setSelectedDay]= useState<DayItem>(
    days.find(d => d.isToday) || days[0]
  );

  const handleSelectDate = (day: DayItem) => {
    setSelectedDay(day);
    navigation.navigate("CalendarTab", {
      screen: "DayViewScreen",
      params: { date: day.date },
    });
  };

  return (
    <View style={styles.container}>
      <HomeHeader />
      <DaySelector 
        days={days}
        selectedDate={selectedDay.date}
        onSelectDate={handleSelectDate}
      />
      {/*Se prueba el diseño de la TaskCard con datos provisionales*/}
      <TaskCard
        time="09:00 AM"
        title="Reunión con Ana"
        description="Revisar entregables semanales"
        color="#93BFCF" />
      <TaskCard
        time="11:30 AM"
        title="Llamada con Pedro"
        description="Confirmar detalles del CRM"
        color="#BDCDD6"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30
  },
});