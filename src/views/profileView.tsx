import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bienvenue sur mon app React Native (TS) !</Text>

      <Text style={styles.counter}>Compteur : {count}</Text>

      <TouchableOpacity style={styles.btn} onPress={() => setCount(prev => prev + 1)}>
        <Text style={styles.btnText}>+1</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  counter: {
    fontSize: 20,
    marginVertical: 20,
  },
  btn: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
});