import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import AppNavigator from './src/navigation';
import { useEffect } from 'react';
import { initDB } from './src/features/calendar/data/persistence/calendarDb';


export default function App() {
  /*Se inicializa la bd */
  useEffect(()=> {
    initDB();
  }, []);

  return (
    /*Atravez del Gesture permite realizar scroll en DaySelector */
    <GestureHandlerRootView style={styles.container}>
      <AppNavigator />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});