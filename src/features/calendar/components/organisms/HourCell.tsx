import { TouchableOpacity, StyleSheet } from 'react-native';
import { EventType } from '../../data/calendarDb';
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
  renderEvent?: (evt: EventType) => React.ReactNode;
}) {
  return (
    <TouchableOpacity style={styles.hourBlock} onPress={() => onPress(hour)}>
      <HourLabel hour={hour} />
      {events.map(evt =>
        renderEvent
          ? renderEvent(evt)
          : <EventItem
            key={evt.id}
            event={evt}
            onEdit={() => onPress(hour)} />)}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  hourBlock: {
    height: 60,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    paddingHorizontal: 8,
  }
})