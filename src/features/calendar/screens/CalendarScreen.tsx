import { useEffect } from "react";
import { usePermissionsStore } from "../../../stores/permissionsStore";
import { View , Text} from "react-native";


export default function CalendarScreen() {
    /*Se lee el estado del permiso */
    const calendarGranted = usePermissionsStore((state) => state.calendarGranted);
    const checkCalendarPermission = usePermissionsStore((state) => state.checkCalendarPermission);

    /*Se pide el permiso para cargar la view */
    useEffect(() => {
        checkCalendarPermission();
    }, []);

    /*Mientras carga */
    if (calendarGranted === null) return <Text>Cargando permiso...</Text>

    /*Si fue denegado */
    if(!calendarGranted) return <Text>Permiso del calendario denegado</Text>;

    /*Si fue concedido */
    return (
        <View>
            <Text>Permiso concedido del calendario</Text>
        </View>
    )
}