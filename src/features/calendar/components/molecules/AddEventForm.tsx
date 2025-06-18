import { useState } from "react";
import { Alert, View , Text, TextInput, StyleSheet, Button} from "react-native";
import { useCalendarStore } from "../../store/calendarStore";

/*Los datos que recibe */
interface Props{
    date: string;
    /*Cierra el modal */
    onSuccess: () => void;
    hour?: number;
}

/*Se crea la función para el modal add event*/
export default function AddEventForm({ date, onSuccess, hour = 0}: Props){
    /*Recibe */
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    
    /*Usa el store que crea el evento */
    const addEvent = useCalendarStore(state => state.addEvent);
    
    const handleSave = async () => {
        if (!title.trim()) {
      Alert.alert('Campo requerido', 'El título es obligatorio');
      return;
    }
    try {
      /*Se llama al store */
      await addEvent(date, title, notes, hour?? 0);
      Alert.alert('Evento agregado');
      onSuccess();  
    } catch (err) {
      console.error('Error al crear evento:', err);
      Alert.alert('Error', 'No se pudo crear el evento');
    }
    };

    return (
        <View style={styles.container}>
            <Text style = {styles.label}>Titulo del evento</Text>
            <TextInput 
                value={title}
                onChangeText={setTitle}
                placeholder='Reunion por Zoom'
                style={styles.input}
            />
            <TextInput 
                value={notes}
                onChangeText={setNotes}
                placeholder="Agregar detalles..."
                multiline 
                style={[styles.input, { height: 80}]}
            />

            <Text style={styles.dateText}>Fecha: {date}</Text>

            <Button 
                title="Guardar evento"
                onPress={handleSave}
            />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  dateText: {
    textAlign: 'right',
    color: '#888',
    fontSize: 12,
    marginTop: 8,
  },
});
