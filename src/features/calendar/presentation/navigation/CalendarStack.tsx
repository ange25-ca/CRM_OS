import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CalendarStackParamList } from './types/types';
import CalendarScreen from '../components/pages/CalendarScreen';
import DayViewScreen from '../components/pages/DayViewScreen';

/*Se crea la stack con los types del calendario */
const Stack = createNativeStackNavigator<CalendarStackParamList>();

export default function CalendarStackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="CalendarScreen"      
            screenOptions={{ headerShown: false }}
        >
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
                    title: "Day View"
                }}
            />
        </Stack.Navigator>
    )
}