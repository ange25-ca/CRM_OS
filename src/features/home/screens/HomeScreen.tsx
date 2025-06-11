import { View, StyleSheet} from "react-native";
import HomeHeader from "../components/organisms/HomeHeader";
import DaySelector from "../components/molecules/DaySelector";


export default function HomeScreen(){
    return (
        <View style={styles.container}>
            <HomeHeader />
            <DaySelector />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30
  },
});