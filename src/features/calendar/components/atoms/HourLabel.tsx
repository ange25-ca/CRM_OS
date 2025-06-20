import {Text, StyleSheet} from 'react-native'

/*Permite mostrar la hora del día */
export function HourLabel({ hour }: { hour: number }) {
  return (
    <Text style={styles.hourText}>
      {hour.toString().padStart(2, '0')}:00
    </Text>
  );
}

const styles= StyleSheet.create({
     hourText: {
    fontSize: 16,
    color: "#333",
  },
})