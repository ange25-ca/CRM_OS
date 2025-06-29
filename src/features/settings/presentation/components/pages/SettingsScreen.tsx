import React from "react";
import { View, Text, Switch, StyleSheet, Linking, Alert } from 'react-native'
import { usePermissionsStore } from "../../../Permissions/infra/permissionsStore";
import { allPermissions } from "../../../Permissions/domain/permissionRegistry";

/*Función que te permite ajustar los permisos */
export default function SettingsScreen() {
  /*Se extrae el estado de permisos */
  const { statuses, request } = usePermissionsStore();

  return (
    <View style={styles.container}>
      {/*Se recorre todos los permisos (son 3) */}
      {allPermissions.map(p => {
        /*Si no hay status se toma como false */
        const granted = statuses[p.id] ?? false;
        return (
          <View key={p.id} style={styles.row}>
            {/*Se muestra el permiso */}
            <Text style={styles.label}>{p.label}</Text>
            {/*Se activa o desactiva el permiso */}
            <Switch
              value={granted}
              onValueChange={async () => {
                await request(p.id);
                const finalGranted = usePermissionsStore.getState().statuses[p.id] ?? false;
                if (!finalGranted) {
                  Alert.alert('Permiso bloqueado', 'Actívalo en Ajustes del sistema.',
                    [
                      { text: 'Abrir Ajustes', onPress: () => Linking.openSettings() },
                    ]);
                }
              }}
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16 
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8
  },
  label: {
    flex: 1,
    fontSize: 16
  }
});
