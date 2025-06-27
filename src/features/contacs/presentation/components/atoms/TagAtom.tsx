import { TouchableOpacity, Text, StyleSheet } from "react-native";

/*Se declaran las propiedades del componente tag */
type TagAtomProps = {
  tag: string;
  onRemove?: (tag: string) => void;
  onEdit?: (tag: string) => void;
  selected?: boolean;
  onPress?: (tag: string) => void;
}

/*Se crea el componente*/
export default function TagAtom({ tag, onRemove, onEdit, selected, onPress }: TagAtomProps) {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selectedContainer]}
      onPress={() => onPress?.(tag)}
      disabled={!onPress}
    >
      {/* Cuenta con estilos condicionales */}
      <Text style={[styles.text, selected && styles.selectedText]}>{tag}</Text>
      {/*Permite editar la etiqueta */}
      {onEdit && (
        <TouchableOpacity onPress={() => onEdit(tag)} style={styles.icon}>
          <Text style={styles.edit}>✎</Text>
        </TouchableOpacity>
      )}
      {/*Permite eliminar la etiqueta */}
      {onRemove && (
        <TouchableOpacity onPress={() => onRemove(tag)} style={styles.icon}>
          <Text style={styles.remove}>×</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    margin: 4,
  },
  text: { fontSize: 14, color: '#333' },
  icon: { marginLeft: 4 },
  edit: { color: '#007AFF' },
  remove: { color: '#FF3B30' },
  selectedContainer: {
    backgroundColor: '#6096B4',
  },
  selectedText: {
    color: '#fff',
  },
});