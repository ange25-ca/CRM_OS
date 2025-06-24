import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

/*Interfaz para el botón de agregar */
interface FabButtonProps {
    onPress: () => void;
    style?: ViewStyle;
    label?: string;
}

export function FabButton({
    onPress, style, label = '+' }: FabButtonProps) {
    return (
        <TouchableOpacity style={[styles.fab, style]} 
            onPress={onPress}>
            <Text style={styles.fabText}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: "absolute",
        bottom: 100,
        right: 24,
        backgroundColor: "#6096B4",
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
    },
    fabText: {
        fontSize: 28,
        color: "#fff",
        fontWeight: "bold",
    },
});
