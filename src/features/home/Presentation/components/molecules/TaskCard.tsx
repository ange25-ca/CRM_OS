import { View, Text, StyleSheet, Pressable } from "react-native";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";

/*Se declaran los tipos de la tarjeta de tareas */
type TaskCardProps = {
    time: string;
    title: string;
    /*Se tiene como opciones: */
    description?: string;
    color?: string;
    onPress?: () => void;
    onLongPress? : () => void;
    showTime?: boolean;
};

/*Se crea la funcion de la tajeta que recibira 4 props anteriormente declaras*/
export default function TaskCard({ time, title, description, color = '#6096B4', onPress , onLongPress, showTime=true}: TaskCardProps) {
    return (
        /*Se hace presionable el evento */
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            style={({ pressed }) => [
                styles.container,
                pressed && { opacity: 0.6 },
            ]}
        >
            <View style={styles.container}>
                {/*Se muestra la hora de la tarea */}
                <Text style={styles.time}>{time}</Text>
                {/*Tarjeta de tarea*/}
                <View style={styles.card}>
                    {/*Franja de colores */}
                    <View style={[styles.colorBar, { backgroundColor: color }]} />
                    {/*Información del taskcard */}
                    <View style={styles.content}>
                        {/*Se visualiza el titulo */}
                        <Text style={styles.title}>{title}</Text>
                        {/*Muestra la descripción en caso de que exista */}
                        {description && <Text style={styles.description}>{description}</Text>}
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

{/*Se crean los estilos correspondientes*/ }
const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 16,
    },
    time: {
        fontSize: 12,
        color: '#888',
        marginBottom: 4,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        overflow: 'hidden',
    },
    colorBar: {
        width: 9,
    },
    content: {
        padding: 12,
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
});

