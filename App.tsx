import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import AppNavigator from './src/navigation';
import { useEffect } from 'react';
import { initDB } from './src/features/calendar/data/persistence/calendarDb';
import * as Notifications from "expo-notifications";


/*Se configura el comportamiento de las notificaciones en la aplicación*/
Notifications.setNotificationHandler({
  handleNotification: async (): Promise<Notifications.NotificationBehavior> => {
    return {
      /*Determina si se muestra la alerta */
      shouldShowAlert:  true,
      /*Controla si se reproduce el sonido de la notificacion */
      shouldPlaySound: false,
      /*Actualiza el numero de notificaciones no leidas */
      shouldSetBadge:  false,
      /*Especifico para iOS (si se muestra en banner) */
      shouldShowBanner: true, 
      /* Controla donde aparecen las notificaciones*/ 
      shouldShowList:   true,  
    };
  },
});

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