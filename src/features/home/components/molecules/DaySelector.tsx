import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";


/*Se definen los tipos del selector */
type DayItem = {
    /*Dia la semana*/
    label: string;
    date: string;
    /*Indicador del día actual */
    isToday: boolean;
}

/*Función que generadora de la semana contando el actual */
const generateWeekDays = () : DayItem[] => {
    /*Se obtiene la fecha actual */
    const today = new Date(); 
    /*Se inicia el array vacio */
    const days : DayItem[] = [];

    /*Se genera un bucle que permita generar los proximos 7 días */
    for (let i = 0; i < 7; i++){
        /*Se crea una nueva fecha basada en la actual */
        const day = new Date();
        /*Añade días a la fecha actual */
        day.setDate(today.getDate() + i);

        /*Al array se añade la información formateada */
        days.push({
            /*Se agrega el día abriaviado en ingles */
            label: day.toLocaleDateString('en-US', { weekday: 'short'}),
            /*Día del mes */
            date: day.getDate().toString(),
            /*En caso de el día actual se marca */
            isToday: day.toDateString() === today.toDateString(),
        });
    }
    /*Se retorna los 7 días en un array */
    return days;
}

/*Funcion del selector */
export default function DaySelector(){
    /*Se generan los días al montar el componente */
    const weekDays = generateWeekDays();
    /*Al ser una lista con scroll, se usa un flatList */
    return (
        <View style={styles.DaySelector}>
            <FlatList
                /*Datos a renderizar */
                data={weekDays}
                /*Posicion horizontal */
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.container}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    /*Se renderiza cada dia como un touchable */
                    <TouchableOpacity
                        /*Se tiene un estilo condicional */
                        style={[
                            styles.dayButton,
                            /*En caso de que el día es el actual */
                            item.isToday && styles.todayButton,
                        ]}
                    >
                        <Text style={styles.dayLabel}>{item.label}</Text>
                        <Text style={styles.dayNumber}>{item.date}</Text>
                    </TouchableOpacity>
                )}
            >
            </FlatList>
        </View>
    )
}

/*Se crean los estilos */
const styles = StyleSheet.create({
  DaySelector:{
    height: 200,
  },
  container: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  dayButton: {
    borderWidth: 1,
    borderColor: '#26545e',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    width: 60,
  },
  todayButton: {
    backgroundColor: '#537f86'
  },
  dayLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  dayNumber: {
    fontSize: 20,   
  },
});