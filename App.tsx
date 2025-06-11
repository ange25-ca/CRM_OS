import { NavigationContainer } from '@react-navigation/native';
import TabsNavigator from './src/navigation/tabs/TabsNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

export default function App() {
  return (
    /*Atravez del Gesture permite realizar scroll en DaySelector */
    <GestureHandlerRootView style={styles.container}>
    {/*Contenedor principal, envuelve a toda la aplicación*/}
      <NavigationContainer>
        {/*Componente que contiene la navegación principal (tabs) */}
        <TabsNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});