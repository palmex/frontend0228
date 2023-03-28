import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Car from "./components/Car"

export default function App() {

  return (
    <View style={styles.container}>
      <Text style={styles.title} >Welcome Class of Stellantis-OU Module 3!</Text>
      <Car></Car>
    </View>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    color: "#b3a33e"
  },
  title2: {
    fontSize: 36, 
    color: "#21397d"
  },
});
