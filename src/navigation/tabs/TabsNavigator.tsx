import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../features/home/screens/HomeScreen";
import StackNavigator from "../stacks/StackNavigator";
import ContactsScreen from "../../features/contacs/presentation/components/pages/ContactSscren";


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
            <Tabs.Screen 
                name="Contac"
                component={ContactsScreen}
                options={{title: 'Contact'}}
            />
        </Tabs.Navigator>
    )
}