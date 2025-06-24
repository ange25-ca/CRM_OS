import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";


/*Se definen los tipos del selector */
export type DayItem = {
  /*Dia la semana*/
  label: string;
  dayLabel: string;
  /*Para pasar en la navegación */
  isoDate: string;
  /*Indicador del día actual */
  isToday: boolean;
}

/*Permite que el formato de la YY-MM-DD queden en dos digitos */
const pad = (n: number) => String(n).padStart(2, '0');

/*Función que generadora de la semana contando el actual */
export function generateWeekDays(): DayItem[] {
  const today = new Date();
  const todayIso = [
    today.getFullYear(),
    pad(today.getMonth() + 1),
    pad(today.getDate())
  ].join('-');

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const iso = [
      d.getFullYear(),
      pad(d.getMonth() + 1),
      pad(d.getDate())
    ].join('-');

    return {
      label:    d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayLabel: String(d.getDate()),
      isoDate:  iso,
      isToday:  iso === todayIso,
    };
  });
}



/*Se define los tipos de DaySelector */
type DaySelectorProps = {
  days: DayItem[];
  selectedDate?: string;
  onSelectDate: (day: DayItem) => void;
}

/*Funcion del selector */
export default function DaySelector({ days, selectedDate, onSelectDate }: DaySelectorProps) {
  /*Al ser una lista con scroll, se usa un flatList */
  return (
    <View style={styles.DaySelector}>
      <FlatList
        /*Datos a renderizar */
        data={days}
        /*Posicion horizontal */
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          const isSelected = item.isoDate === selectedDate;
          return (
            /*Se renderiza cada dia como un touchable */
            <TouchableOpacity
              onPress={() => onSelectDate(item)}
              /*Se tiene un estilo condicional */
              style={[
                styles.dayButton,
                /*En caso de que el día es el actual */
                item.isToday && styles.todayButton,
              ]}
            >
              <Text style={styles.dayLabel}>{item.label}</Text>
              <Text style={styles.dayNumber}>{item.dayLabel}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View >
  );
}

/*Se crean los estilos */
const styles = StyleSheet.create({
  DaySelector: {
    height: 200,
  },
  container: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  dayButton: {
    borderWidth: 1,
    borderColor: '#26545e',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    width: 60,
  },
  todayButton: {
    backgroundColor: '#537f86'
  },
  dayLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  dayNumber: {
    fontSize: 20,
  },
});