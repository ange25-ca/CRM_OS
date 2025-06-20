import { View, Text, StyleSheet } from "react-native";

export function EventItem({ title }: { title: string }) {
  return (
    <View style={styles.eventBox}>
      <Text style={styles.eventTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  eventBox: {
    backgroundColor: "#93BFCF",
    padding: 6,
    borderRadius: 6,
    marginTop: 4,
  },
  eventTitle: {
    color: "#fff",
    fontWeight: "bold",
  }
})