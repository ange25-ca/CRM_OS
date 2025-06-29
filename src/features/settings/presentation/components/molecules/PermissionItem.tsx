import { View, Text, StyleSheet } from "react-native";
import ToggleSwitch from "../atoms/ToggleSwitch";

interface PermissionItemProps{
    label:string;
    isGranted: boolean;
    onToggle: () => void;
}

export default function PermissionItem({ label, isGranted, onToggle}: PermissionItemProps) {
    return (
         <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            {/* Utilizamos el componente atom para el switch */}
            <ToggleSwitch isOn={isGranted} onToggle={onToggle} />
        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',             
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomColor: '#eee',      
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
});