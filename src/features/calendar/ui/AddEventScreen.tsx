import { useRoute, useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';


export default function AddEventScreen() {
  /*Recibe las fecha del calendario */
  const route = useRoute();
  const navigation = useNavigation();
  /*Como pureba se asume que dentro de los parametros
  *se tiene un string dentro de la constante date */
  const { date } = route.params as { date: string };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Crear evento para:</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    marginBottom: 16,
    fontSize: 16,
    color: '#6096B4',
  },
});
