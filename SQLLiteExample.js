import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('database');

export default function App() {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS Customers (name TEXT)');
    });

    fetchData();
  }, []);

  const fetchData = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Customers', [], (_, { rows }) => {
        setData(rows._array);
      });
    });
  };

  const addCustomer = () => {
    if (username.trim() === '') {
      Alert.alert('Please enter a customer name');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Customers (name) VALUES (?)',
        [username],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            Alert.alert('Customer added successfully');
            setUsername('');
            fetchData();
          } else {
            Alert.alert('Failed to add customer');
          }
        }
      );
    });
  };

  const [loaded] = useFonts({
    poppins: require('./assets/Poppins/Poppins-Bold.ttf'),
  });

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.heading}>Little Lemon Customers</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={text => setUsername(text)}
        placeholder="Enter the customer name"
      />
      <TouchableOpacity style={styles.button} onPress={addCustomer}>
        <Text style={styles.buttonText}>Save Customer</Text>
      </TouchableOpacity>
      <Text style={styles.para}>Customers:</Text>
      <View>
        {data.map((customer, index) => (
          <Text key={index} style={styles.customerText}>
            {customer.name}
            {'\n'}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'poppins',
  },
  input: {
    marginTop: 20,
    fontFamily: 'poppins',
    borderWidth: 1,
    padding: 5,
    fontSize: 15,
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#00761e',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'poppins',
  },
  para: {
    fontFamily: 'poppins',
  },
  customerText: {
    fontFamily: 'poppins',
    fontSize: 16,
    marginTop: 5,
  },
});
