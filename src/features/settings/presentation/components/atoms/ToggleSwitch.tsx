import React from 'react';
import { Switch, SwitchProps } from 'react-native';

/**Se define las props del componente toogle */
interface ToggleSwitchProps extends SwitchProps {
    /*Se define si el switch esta encendido */
    isOn: boolean;
    /*Función para el cambio del Switch */
    onToggle: (value: boolean) => void;
}

/*Función para el switch */
export default function ToogleSwitch({ isOn, onToggle, ...rest }: ToggleSwitchProps) {
    return (
        <Switch
            /*Valor actual del Switch */
            value={isOn}
            /*Función a llamar cuando el switch cambia */
            onValueChange={onToggle}
            /*Color según el estado isOn */
            thumbColor={isOn ? '#00cc99' : '#ccc'}
            {...rest}
        />

    )

}
