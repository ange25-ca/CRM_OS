import React from "react";
import { TouchableOpacity, View , Text, StyleSheet} from "react-native";

/*Se crea la interfaz para el componente Day */
interface Props {
    day: number;
    dateString: string;
    isSelected: boolean;
    isToday: boolean;
    isDisabled: boolean;
    onPress: () => void;
    /*Recibe eventos */
    hasEvents?:boolean;
}

/*Componente que representa un día individual del calendario */
const Day = ({ 
  day, 
  dateString,
  isSelected,
  isToday, 
  isDisabled, 
  onPress, 
  hasEvents= false}: Props) =>
{
    return (
        <TouchableOpacity onPress={onPress}>
            <View
            /*Estilo base de las celdas */
                style={[
                    styles.dayContainer,
                    isSelected && styles.selectedDayContainer,
                    isToday && styles.todayContainer,
                ]}>
                {/*Fecha del día */}
                <Text
                    style={[
                        styles.dayText,
                        isDisabled && { color: '#C1C4C2' },
                        isSelected && styles.selectedDayText,
                        isToday && styles.todayText,
                    ]}> {day}
                    <Text>
                      {/*Punto visual */}
                      {hasEvents && <View style={styles.eventDot}></View>}
                    </Text>
                </Text>
            </View>
        </TouchableOpacity>
    );
}

/*Permite que no se re-renderice las props si no cambian */
export default React.memo(Day);

// Estilos conforme se encuentre la celda
const styles = StyleSheet.create({
  dayContainer: {
    width: 48,
    height: 92,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    borderRadius: 8,
  },
  dayText: {
    fontSize: 16,
    color: '#000',
  },
  selectedDayContainer: {
    backgroundColor: '#93BFCF',
    borderRadius: 8,
  },
  selectedDayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  todayContainer: {
    borderWidth: 2,
    borderColor: '#6096B4',
    borderRadius: 8,
  },
  todayText: {
    color: '#6096B4',
    fontWeight: 'bold',
  },
  eventDot: {
    width: 6,
    height:6,
    borderRadius: 3,
    backgroundColor: "#609",
    marginTop: 4

  }
});