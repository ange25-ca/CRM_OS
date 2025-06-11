import { View, StyleSheet} from "react-native";
import HomeHeader from "../components/organisms/HomeHeader";
import DaySelector from "../components/molecules/DaySelector";
import TaskCard from './../components/molecules/TaskCard';


export default function HomeScreen(){
  return (
    <View style={styles.container}>
      <HomeHeader />
      <DaySelector />
      {/*Se prueba el diseño de la TaskCard con datos provisionales*/}
      <TaskCard
        time="09:00 AM"
        title="Reunión con Ana"
        description="Revisar entregables semanales"
        color="#93BFCF" />
      <TaskCard
        time="11:30 AM"
        title="Llamada con Pedro"
        description="Confirmar detalles del CRM"
        color="#BDCDD6"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30
  },
});