import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../features/home/screens/HomeScreen";
import CalendarScreen from "../../features/calendar/ui/CalendarScreen";
import StackNavigator from "../stacks/StackNavigator";
import DayViewScreen from "../../features/calendar/ui/DayViewScreen";


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
                name="CalendarTab"
                component={StackNavigator}
                options={{title:'Calendario'}}
            />
            {/*Como forma de prueba se agrega la vista como tabs */}
            <Tabs.Screen 
                name='Day View'
                component={DayViewScreen}
                options={{title: 'Hours Day'}}
            />
        </Tabs.Navigator>
    )
}