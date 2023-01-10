import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import createIban from './functions/iban';

import { auth, firestore } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function CreatAccount({ navigation }) {

  // Create saving account for user
  const createAccount = async () => {
    const iban = createIban();
    await setDoc(doc(firestore, "users", auth.currentUser.uid, "accounts", iban), {
      iban: iban,
      type: "Sparkonto",
      balance: 0,
    });
    navigation.replace("Home");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Möchten Sie ein Sparkonto erstellen?</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('Home')
          }
        >
          <Text style={styles.text}>Nein</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={createAccount}
        >
          <Text style={styles.text}>Ja</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F2045',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 24,
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 5,
    margin: 20,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
  },
});