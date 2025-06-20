import { useState } from "react";
import { Alert, View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useCalendarStore } from "../../store/calendarStore";
import { FormField } from "../molecules/FormField";
import { DateDisplay } from "../molecules/DateDisplay";
import { ButtonAtom } from "../atoms/Button";

/*Los datos que recibe */
interface Props {
  date: string;
  /*Cierra el modal */
  onSuccess: () => void;
  hour?: number;
}

/*Se crea la función para el modal add event*/
export default function AddEventForm({ date, onSuccess, hour = 0 }: Props) {
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
      await addEvent(date, title, notes, hour ?? 0);
      Alert.alert('Evento agregado');
      onSuccess();
    } catch (err) {
      console.error('Error al crear evento:', err);
      Alert.alert('Error', 'No se pudo crear el evento');
    }
  };

  return (
    <View style={styles.container}>
      <FormField
        label="Título del evento"
        value={title}
        onChangeText={setTitle}
        placeholder="Reunión por Zoom"
      />

      <FormField
        label="Notas"
        value={notes}
        onChangeText={setNotes}
        placeholder="Agregar detalles..."
        multiline
        inputStyle={{ height: 80 }}
      />

      <DateDisplay date={date} />

      <ButtonAtom
        title="Guardar evento"
        onPress={handleSave}
        style={{marginTop: 12}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  }
});
