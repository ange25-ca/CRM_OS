import { NavigatorScreenParams } from "@react-navigation/native";
import { CalendarStackParamList } from "../../../features/calendar/presentation/navigation/types/types";

export type TabParamList = {
  Home: undefined;       
  CalendarTab: NavigatorScreenParams<CalendarStackParamList>; 
  ContacTab: NavigatorScreenParams<CalendarStackParamList>;
};