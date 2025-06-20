import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useCalendarStore } from '../../store/calendarStore';
import type { EventType } from '../../data/calendarDb';

export function EventItem({
  event,
  onEdit
}: {
  event: EventType;
  onEdit: () => void;
}) {
  const deleteEvent = useCalendarStore(s => s.deleteEvent);

  const confirmDelete = () => {
    Alert.alert(
      'Borrar evento',
      '¿Seguro que quieres eliminar este evento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => deleteEvent(event.id, event.date)
        }
      ]
    );
  };

  return (
    <View style={styles.box}>
      <Text style={styles.text}>{event.title}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit}>
          <Text style={styles.edit}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={confirmDelete}>
          <Text style={styles.delete}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#93BFCF',
    padding: 6,
    borderRadius: 6,
    marginTop: 4
  },
  text: { 
    color: '#fff', 
    fontWeight: 'bold', 
    flex: 1 },
  actions:{ 
    flexDirection: 'row' 
  },
  edit:{ 
    marginHorizontal: 8, 
    fontSize: 16 
  },
  delete:{ 
    fontSize: 16 
  }
});
