import { LogBox } from 'react-native';
import { registerRootComponent } from 'expo';

/*En el caso de este proyecto solo se utiliza expo-notifications LOCALMENTE 
 los warnig que aprecen en consola y pantalla corresponden a las notificaciones remotas */

 /*Se usa el LogBox para ocultar los warnign en el proyecto (Solo en la UI) */
LogBox.ignoreLogs([
  'expo-notifications: Android Push notifications',
  '`expo-notifications` functionality is not fully supported in Expo Go'
]);

import App from './App';
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
