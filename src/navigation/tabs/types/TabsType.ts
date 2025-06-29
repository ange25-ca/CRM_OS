import { NavigatorScreenParams } from "@react-navigation/native";
import { CalendarStackParamList } from "../../../features/calendar/presentation/navigation/types/types";
import { ContactStackParamList } from "../../../features/contacs/presentation/navigation/types/type";

export type TabParamList = {
  Home: undefined;       
  CalendarTab: NavigatorScreenParams<CalendarStackParamList>; 
  ContacTab: NavigatorScreenParams<ContactStackParamList>;
  SettingsScreen: undefined;
};