import { useEffect, useState } from "react";
import { usePermissionsStore } from "../../../stores/permissionsStore";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";


export default function CalendarScreen() {
    /*Se lee el estado del permiso */
    // const calendarGranted = usePermissionsStore((state) => state.calendarGranted);
    //const checkCalendarPermission = usePermissionsStore((state) => state.checkCalendarPermission);
    /*Se pide el permiso para cargar la view 
    useEffect(() => {
        checkCalendarPermission();
    }, []);*/

    /*Mientras carga 
    if (calendarGranted === null) return <Text>Cargando permiso...</Text>

    /*Si fue denegado 
    if(!calendarGranted) return <Text>Permiso del calendario denegado</Text>;

    /*Si fue concedido */

    /*Constantes que permiten manejar la fecha seleccionada*/
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    return (
        <View style={styles.container}>
            {/* Calendario mensual */}
            <Calendar
                /*Se crea el evento al seleccionar un día */
                onDayPress={(day) => {
                    /*Se guarda la fecha: YYY-MM-DD */
                    setSelectedDate(day.dateString);
                }}

                /*Días marcados en el calendario */
                markedDates={
                    selectedDate ? {
                        [selectedDate]: {
                            /*Resalta el día seleccionado */
                            selected: true,
                            selectedColor: '#93BFCF',
                        },
                    }
                        : {}
                }

                /*Tema de visualizacion del calendario */
                theme={{
                    selectedDayBackgroundColor: '#93BFCF',
                    todayTextColor: '#6096B4',
                    arrowColor: '#6096B4',
                }}

            />
            {/*Se muestra la fecha seleccionada */}
            {selectedDate && (
                <Text style={styles.dateInfo}>Fecha seleccionada: {selectedDate}</Text>
            )}
        </View>
    )
}

// Estilos del la vista
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:20,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 12,
    },
    dateInfo: {
        fontSize: 16,
        marginTop: 16,
        textAlign: 'center',
    }
});