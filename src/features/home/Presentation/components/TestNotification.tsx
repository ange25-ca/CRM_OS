import React from "react";
import { View, Button, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import { usePermissionsStore } from "../../../settings/Permissions/infra/permissionsStore";

export default function TestNotification() {
  const ensureNotifications = usePermissionsStore(
    (s) => s.ensureNotificationsPermission
  );

  const sendTestNotification = async () => {
    try {
      /*Confirma el permiso */
      await ensureNotifications();

      /*Se realiza la programación de la notificacion */
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Notificación de prueba",
          body: "¡Ha funcionado!",
        },
        trigger: {
          type:    Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 5,
          repeats: false,
        },
      });

      Alert.alert("Notificación programada en 5s");
    } catch (err: any) {
      Alert.alert("Permiso denegado", err.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Probar notificación" onPress={sendTestNotification} />
    </View>
  );
}
