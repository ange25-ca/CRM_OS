import { useEffect, useState } from "react";
import { Alert, View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ScrollView } from "react-native";
import { useCalendarStore } from "../../viewmodel/calendarStore";
import { FormField } from "../molecules/FormField";
import { DateDisplay } from "../molecules/DateDisplay";
import { ButtonAtom } from "../atoms/Button";
import { EventType } from "../../../data/persistence/calendarDb";
import { saveEventWithFallback } from "../../../data/persistence/eventWithFallBack";

/*Los datos que recibe */
interface Props {
  date: string;
  /*Cierra el modal */
  onSuccess: () => void;
  hour?: number;
  onPermissionDenied?: () => void;
}

/*Se crea la función para el modal add event*/
export default function AddEventForm({ date, onSuccess, onPermissionDenied ,hour = 0, editingEvent }: Props & { editingEvent?: EventType }) {
  /*Recibe */
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');

  /*El estado de la seleccion de hora */
  const [selectedHour, setSelectedHour] = useState<number>(
    editingEvent?.hour ?? hour
  )
  /*Usa el store que crea el evento */
  const addEvent = useCalendarStore(state => state.addEvent);
  const updateEvent = useCalendarStore(state => state.updateEvent);

  // Si editingEvent existe, inicializamos los campos con él
  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setNotes(editingEvent.notes ?? '');
      setSelectedHour(editingEvent.hour);
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
          hour: selectedHour
        });
        Alert.alert('Evento actualizado');
      } else {
        /*Se crea */
        await saveEventWithFallback(
          /*Se genera un idUnico */
        Date.now().toString(),
        title,
        notes,
        date,
        selectedHour
      );
      Alert.alert('Evento agregado');
    }
    onSuccess();
  } catch (err) {
    console.error('Error al guardar evento:', err);
    onPermissionDenied?.();
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

      {/*Se realiza el scroll para seleccionar una hora */}
      <View style={styles.hoursWrapper}>
        <Text style={styles.hoursLabel}>Hora:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hoursScroll}
        >
          {Array.from({ length: 24 }, (_, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.hourItem,
                selectedHour === i && styles.hourItemSelected
              ]}
              onPress={() => setSelectedHour(i)}
            >
              <Text
                style={[
                  styles.hourText,
                  selectedHour === i && styles.hourTextSelected
                ]}
              >
                {i.toString().padStart(2, "0")}:00
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
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
  },
   hoursWrapper: {
    marginTop: 8
  },
  hoursLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4
  },
  hoursScroll: {
    paddingVertical: 4
  },
  hourItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8
  },
  hourItemSelected: {
    backgroundColor: "#537f86",
    borderColor: "#537f86"
  },
  hourText: {
    fontSize: 14
  },
  hourTextSelected: {
    color: "#fff",
    fontWeight: "600"
  }
});
