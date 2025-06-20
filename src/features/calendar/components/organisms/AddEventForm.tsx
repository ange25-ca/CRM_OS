import { useEffect, useState } from "react";
import { Alert, View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useCalendarStore } from "../../store/calendarStore";
import { FormField } from "../molecules/FormField";
import { DateDisplay } from "../molecules/DateDisplay";
import { ButtonAtom } from "../atoms/Button";
import { EventType } from "../../data/calendarDb";

/*Los datos que recibe */
interface Props {
  date: string;
  /*Cierra el modal */
  onSuccess: () => void;
  hour?: number;
}

/*Se crea la función para el modal add event*/
export default function AddEventForm({ date, onSuccess, hour = 0, editingEvent }: Props & { editingEvent?: EventType }) {
  /*Recibe */
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');

  /*Usa el store que crea el evento */
  const addEvent = useCalendarStore(state => state.addEvent);
  const updateEvent = useCalendarStore(state => state.updateEvent);

  // Si editingEvent existe, inicializamos los campos con él
  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setNotes(editingEvent.notes ?? '');
    }
  }, [editingEvent]);


  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Campo requerido', 'El título es obligatorio');
      return;
    }
    try {
      if (editingEvent) {
        /*Se actualiza */
        await updateEvent({
          id: editingEvent.id,
          title,
          notes,
          date,
          hour: hour ?? editingEvent.hour
        });
        Alert.alert('Evento actualizado');
      } else {
        /*Se crea */
        await addEvent(date, title, notes, hour ?? 0);
        Alert.alert('Evento agregado');
      }
      onSuccess();
    } catch (err) {
      console.error('Error al guardar evento:', err);
      Alert.alert('Error', 'No se pudo guardar el evento');
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
        title={editingEvent ? "Guardar evento" : 'Crear evento'}
        onPress={handleSave}
        style={{ marginTop: 12 }}
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
