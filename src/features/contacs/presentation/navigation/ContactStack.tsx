import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactsScreen from '../components/pages/ContactSscren';
import ContactDetailScreen from '../components/pages/ContactDetailScreen';
import { ContactStackParamList } from './types/type';

/*Se crea la stack con los types del Contact */
const Stack = createNativeStackNavigator<ContactStackParamList>();

export default function ContactStackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="ContacScreen"      
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen 
                name="ContacScreen"
                component={ContactsScreen}
                options={{
                    headerShown: false,
                    title: "Contac"
                }}
            />
            <Stack.Screen 
                name="ContactDetailScreen"
                component={ContactDetailScreen}
                options={{
                    headerShown: false,
                    title:"Detail"
                }}
            />
        </Stack.Navigator>
    )
}