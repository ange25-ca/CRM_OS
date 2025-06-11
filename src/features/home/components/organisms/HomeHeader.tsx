import { View, Text, StyleSheet } from "react-native";


export default function HomeHeader() {
    /*Se crean las variables para: */
    /*El saludo */
    const greeting = 'Hello!';
    /*La fecha actual en texto */
    const currentDate = new Date().toDateString();

    return (
        <View style={styles.container}>
            {/*Saludo*/}
            <Text style={styles.greeting}>{greeting}</Text>
           <View style={styles.currentDate}>
                {/*Fecha actual*/}
                <Text style={styles.date}>{currentDate}</Text>
            </View> 
        </View>
    )
}

/*Se crean los estilos para los componentes de HomeHeader */
const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 10,
    },
    greeting:{
        fontSize: 24,
        fontWeight: 'bold'
    },
    currentDate:{
        
    },
    date:{
        fontSize: 16,
        color: '#26545e',
        fontWeight: 'bold'
    }
})