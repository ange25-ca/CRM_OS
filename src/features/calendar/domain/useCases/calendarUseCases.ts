
import { createEventForDate } from "../../data/service/calendarService";

/*Se crea la funcion para agregar evento */
export async function addEventForDate(
    date:string,
    title: string, 
    notes?: string)
    {
        return await createEventForDate(
            date, 
            title, 
            notes);
    }