import React from 'react';
import { View, StyleSheet } from 'react-native';
import ActionButton from '../atoms/ActionButton';
import type { Interaccion } from '../../../../relational/entities/contacto';

/*Se realiza la prop que recibiran los botones */
type Props = {
    onAction: (
        tipo: Interaccion['tipo']) => void;
};

/*Organismo que crea los botones */
export default function ActionsGroup({ onAction }: Props) {
    return (
        <View style={styles.row}>
            <ActionButton
                icon="call"
                label="Llamar"
                onPress={() => onAction('llamada')}
            />
            <ActionButton
                icon="mail"
                label="Email"
                onPress={() => onAction('email')}
            />
            <ActionButton
                icon="people"
                label="Reunión"
                onPress={() => onAction('reunión')} />
            <ActionButton
                icon="chatbubble" label="Mensaje"
                onPress={() => onAction('mensaje')} />
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 16,
    },
});
