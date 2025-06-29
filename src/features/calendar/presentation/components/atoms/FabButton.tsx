import {  MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

/*Interfaz para el botón de agregar */
interface FabButtonProps {
    onPress: () => void;
    style?: ViewStyle;
}

export function FabButton({
    onPress, style, }: FabButtonProps) {
    return (
        <TouchableOpacity style={[styles.fab, style]} 
            onPress={onPress}>
            <MaterialCommunityIcons 
                name="calendar-plus" 
                size={30} color="#6096B4" 
                style={{ marginTop: 11}}

            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    fab: {
        bottom: 5,
        right: 2,
        width: 45,
        height: 45,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
    },
    fabText: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
