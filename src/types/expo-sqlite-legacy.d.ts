
import * as ExpoSQLite from 'expo-sqlite';

/*Se extiende el modulo de expo-sqlite */
declare module 'expo-sqlite' {
  export interface SQLiteDatabase {
    transaction(
      callback: (tx: SQLTransaction) => void,
      error?:    (e: any) => void,
      success?:  () => void
    ): void;
  }
  /*Se agrega la transaction para la base de datos */
  export interface SQLTransaction {
    executeSql(
      sql:     string,
      args?:   any[],
      success?: (tx: SQLTransaction, result: { rows: { _array: any[] } }) => void,
      error?:   (tx: SQLTransaction, err: any) => boolean
    ): void;
  }
}
