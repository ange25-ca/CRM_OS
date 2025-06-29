import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { EventType } from '../../../data/persistence/calendarDb';
import { EventItem } from '../molecules/EventItem';
import { HourLabel } from '../atoms/HourLabel';

/*Permite mostrar la hora en celdas */
export function HourCell({
  hour,
  events,
  onPress,
  renderEvent
}: {
  hour: number;
  events: EventType[];
  onPress: (hour: number) => void;
  renderEvent: (evt: EventType) => React.ReactNode;
}) {
  return (
    <View style={styles.container}>
      {/* 1️⃣ Columna de la hora */}
      <View style={styles.labelContainer}>
        <HourLabel hour={hour} />
      </View>

      {/* 2️⃣ Columna de eventos (o espacio vacío si no hay) */}
      <View style={styles.eventsContainer}>
        {events.length > 0 ? (
          events.map(evt => (
            <View key={evt.id} style={styles.eventWrapper}>
              {renderEvent(evt)}
            </View>
          ))
        ) : (
          <TouchableOpacity
            style={styles.emptySlot}
            onPress={() => onPress(hour)}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    // minHeight para al menos 60, pero crece si hay más eventos:
    minHeight: 60,
    paddingVertical: 8,
  },
  labelContainer: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventsContainer: {
    flex: 1,
    paddingLeft: 8,
  },
  eventWrapper: {
    marginBottom: 4, // separación entre eventos
  },
  emptySlot: {
    flex: 1,
    height: 44,      // área “touchable” para crear evento
  },
})