import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarScreen from '../../features/calendar/ui/CalendarScreen';
import AddEventScreen from '../../features/calendar/ui/AddEventScreen';
import DayViewScreen from '../../features/calendar/ui/DayViewScreen';

import { CalendarStackParamList } from './types/types';

/*Se crea la stack con los types del calendario */
const Stack = createNativeStackNavigator<CalendarStackParamList>();

export default function StackNavigator(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="CalendarScreen"
                component={CalendarScreen}
                options={{
                    title: "Calendar",
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="DayViewScreen"
                component={DayViewScreen}
                options={{
                    headerShown: false,
                    title: " Day View"
                }}
            />
            <Stack.Screen 
                name="AddEventScreen"
                component={AddEventScreen}
                options={{
                    headerShown: false,
                    title: "Add Event"
                }}
            />
        </Stack.Navigator>
    )
}