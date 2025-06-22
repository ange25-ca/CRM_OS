import { NavigatorScreenParams } from "@react-navigation/native";
import { CalendarStackParamList } from "../../stacks/types/types";

export type TabParamList = {
  Home: undefined;       
  CalendarTab: NavigatorScreenParams<CalendarStackParamList>; 
  Contac: undefined;
};