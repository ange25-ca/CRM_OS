import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarScreen from '../../features/calendar/components/pages/CalendarScreen';
import { CalendarStackParamList } from './types/types';
import DayViewScreen from '../../features/calendar/components/pages/DayViewScreen';

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
                    title:"Day View"}}
            />
        </Stack.Navigator>
    )
}