import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../features/home/Presentation/pages/HomeScreen";
import { StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CalendarStackNavigator from "../../features/calendar/presentation/navigation/CalendarStack";
import ContactStackNavigator from "../../features/contacs/presentation/navigation/ContactStack";
import SettingScreen from "../../features/settings/presentation/components/pages/SettingsScreen";


const Tabs = createBottomTabNavigator();

/*Se crea la función para la navegación */
export default function TabsNavigator() {
    return (
        /*Contenedor principal para la navegación*/
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                /*Se muestran los iconos */
                tabBarShowIcon: true,
                /*Estilos para elt tab */
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: "#6096B4",
                tabBarInactiveTintColor: "#999",
                tabBarItemStyle: styles.tabBarItem,    
                tabBarIconStyle: styles.tabBarIcon,    
            })}
        >
            {/*Vista principal */}
            <Tabs.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="CalendarTab"
                component={CalendarStackNavigator}
                options={{
                    title: 'Calendar',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar-outline"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="ContacTab"
                component={ContactStackNavigator}
                options={{
                    title: 'Contact',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="people-outline"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Tabs.Screen 
                name="SettingsScreen"
                component={SettingScreen}
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color, size}) => (
                        <Ionicons name="settings-outline"
                        size={size}
                        color={color}
                        />
                    )
                }}
            />
        </Tabs.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        position: "absolute",
        bottom: 5,
        left: 20,
        right: 20,
        height: 80,
        backgroundColor: "#fff",
        borderRadius: 50,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        paddingBottom: Platform.OS === "ios" ? 10 : 0,
    }, 
    tabBarItem: {
        justifyContent: "center",
        alignItems: "center",
    },
    tabBarIcon: {
        marginTop: 18,
    },
});