import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/*Se realiza las type para el icono del botón */
type Props = {
  title: string;
  onPress: () => void;
  color?: string;
  backgroundColor?: string;
};

/*Se crea la función */
export default function TextButtonAtom({ title, onPress, color = '#fff', backgroundColor = '#B00020' }: Props) {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }]} onPress={onPress}>
      <Text style={[styles.text, { color }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 110,
    borderRadius: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});