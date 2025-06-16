import { RouteProp, useRoute } from "@react-navigation/native";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { CalendarStackParamList } from "../../../navigation/stacks/types/types";

  /*Se define el tipo especifico de la ruta */
  type DayViewRouteProp = RouteProp<CalendarStackParamList, 'DayViewScreen'>;

export default function DayViewScreen() {

  /*Recibe la fecha como parámetro */
  const route = useRoute<DayViewRouteProp>();
  const { date } = route.params;

  /*Lista de las horas del día */
  const hours = Array.from({ length: 15 }, (_, i) => 7 + i);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Agenda para {date}</Text>
      <FlatList
        data={hours}
        keyExtractor={(hour) => hour.toString()}
        renderItem={({ item: hour }) => (
          <View style={styles.hourBlock}>
            <Text style={styles.hourText}>
              {hour.toString().padStart(2, '0')}:00
            </Text>

          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  hourBlock: {
    height: 60,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
  },
  hourText: {
    fontSize: 16,
    color: '#333',
  },
});
