import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../features/home/screens/HomeScreen";
import CalendarScreen from "../../features/calendar/screens/CalendarScreen";


const Tabs = createBottomTabNavigator();

/*Se crea la función para la navegación */
export default function TabsNavigator(){
    return(
        /*Contenedor principal para la navegación*/
        <Tabs.Navigator>
            {/*Vista principal */}
            <Tabs.Screen
                name="Home"
                component={HomeScreen}
                options={{headerShown: false}}
            />
            <Tabs.Screen
                name="Moth Calendar"
                component={CalendarScreen}
            />
        </Tabs.Navigator>
    )
}