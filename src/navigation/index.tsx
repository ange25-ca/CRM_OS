import { NavigationContainer } from '@react-navigation/native';
import TabsNavigator from './tabs/TabsNavigator';

export default function AppNavigator() {
  return (
    /*Contenedor principal, envuelve a toda la aplicación*/    
    <NavigationContainer>
      <TabsNavigator />
    </NavigationContainer>
  );
}
