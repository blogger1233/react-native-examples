import * as SQLite from "expo-sqlite";
import { View, Alert } from "react-native"; // Import Alert from react-native
import { useEffect } from "react";

const db = SQLite.openDatabase('example');

export default function App() {
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists customers (id integer primary key not null, name text)' // corrected SQL statement
      );
      tx.executeSql(
        'insert into customers (name) values (?), (?)', [
        'Mark',
        'John'
        ]
      );
      tx.executeSql(
        'select * from customers', [], (_, { rows }) => {
          Alert.alert(JSON.stringify(rows));
        }
      );
    });
  }, []);

  return (
    <View></View>
  );
}
