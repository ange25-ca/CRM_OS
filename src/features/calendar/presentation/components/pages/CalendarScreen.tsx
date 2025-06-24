import { useEffect, useState } from "react";
import { View,StyleSheet} from "react-native";
import CalendarView from "../organisms/CalendarView";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CalendarStackParamList } from "../../../../../navigation/stacks/types/types";

export default function CalendarScreen() {
  /*Permite la navegación en stack */
  const navigation = useNavigation<NativeStackNavigationProp<CalendarStackParamList>>();
  
  /*Actualiza fecha y navega */
  const handleDayPress = (dateString: string) => {
    /*Navega por el día */
   navigation.navigate('DayViewScreen', { date: dateString }); 
  };

  return (
    <View style={styles.container}>
      {/* Se integra el organismo con la vista del calendario */}
      <CalendarView
        selectedDate={null}
        onSelectDate={handleDayPress}
        /*Se agrega el evento */
        eventDates={[]}
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