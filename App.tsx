import { NavigationContainer } from '@react-navigation/native';
import TabsNavigator from './src/navigation/tabs/TabsNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import AppNavigator from './src/navigation';

export default function App() {
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