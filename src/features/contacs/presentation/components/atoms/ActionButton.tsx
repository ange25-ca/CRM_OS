import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/*Se crean las funciones para el botón */
type Props = {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    onPress: () => void;
};

/*Se crea la función del botón */
export default function ActionButton({ icon, label, onPress }: Props) {
    return (
        <TouchableOpacity
            style={styles.btn} onPress={onPress}>
            <Ionicons
                name={icon} size={24}
                color="white" />
            <Text style={styles.txt}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#6096B4',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        width: 70,
    },
    txt: {
        color: '#fff',
        fontSize: 12,
        marginTop: 4,
        textAlign: 'center',
    },
});
