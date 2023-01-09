import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import loginStyle from './styles/loginStyle';
import buttonView from './styles/buttonView';
import inputView from './styles/inputView';
import textLink from './styles/textLink';

import { auth, firestore } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, collection, setDoc, getDocs } from "firebase/firestore";


export default function Registration({ navigation }) {
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVal, setPasswordVal] = useState("");

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        addUserToDB();
        navigation.replace('Home');
      })
      .catch((error) => {
        console.log(error);
        alert("Bitte überprüfen Sie ihre Angaben.");
      });
  }

  const getUserCount = async () => {
    const querySnapshot = await getDocs(collection(firestore, "users"));
    let count = 0;
    querySnapshot.forEach((doc) => {
      count = count + 1;
      //console.log(doc.id, " => ", doc.data());
    });
    return count;
  }

  const addUserToDB = async () => {
    const count = await getUserCount();
    await setDoc(doc(firestore, "users", "user" + count), {
      id: "user" + count,
      surname: surname,
      name: name,
      email: email
    });
    createAccForUser(count);
  }

  const createAccForUser = async (count) => {
    const iban = createIban();
    await setDoc(doc(firestore, "users", "user" + count, "accounts", "acc0"), {
      id: "acc0",
      iban: iban,
      balance: 0,
    });
  }

  const createIban = () => {
    // Generate a random domestic bank account number
    const accountNumber = Math.random().toString(36).substring(2);
    // Generate a random check digit
    const checkDigit = Math.floor(Math.random() * 10);
    // Use a predefined country code
    const countryCode = 'TWWIS';
    // Concatenate the country code, check digit, and domestic bank account number to form the IBAN
    const iban = countryCode + checkDigit + accountNumber;

    console.log(iban);
    return iban;
  }

  function createUser() {
    if (name != "" && surname != "" && email != "" && password != "" && passwordVal != "") {
      if (password === passwordVal) {
        handleSignUp();
      }
      else {
        alert("Die Passwörter stimmen nicht überein,");
      }
    }
    else {
      alert("Bitte füllen Sie das Formular vollständig aus.");
    }
  }

  return (
    <View style={loginStyle.container}>
      <ScrollView
        scrollEnabled={false}
        style={loginStyle.container}
        keyboardShouldPersistTaps='handled'
      >
        <View style={loginStyle.headerRegistration}>
          <Text style={loginStyle.title}>Registrierung</Text>
        </View>
      </ScrollView>
      <ScrollView
        scrollEnabled={false}
        style={loginStyle.mainContainer}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.container}>
          <TextInput
            style={inputView.textInput}
            onChangeText={(surname) => setSurname(surname)}
            placeholder="Name"
          />
          <TextInput
            style={inputView.textInput}
            onChangeText={(name) => setName(name)}
            placeholder="Vorname"
          />
          <TextInput
            style={inputView.textInput}
            onChangeText={(email) => setEmail(email)}
            placeholder="E-Mail"
          />
          <TextInput
            style={[inputView.textInput, { marginTop: 40 }]}
            onChangeText={(password) => setPassword(password)}
            placeholder="Passwort"
            secureTextEntry={true}
          />
          <TextInput
            style={inputView.textInput}
            onChangeText={(passwordVal) => setPasswordVal(passwordVal)}
            placeholder="Passwort bestätigen"
            secureTextEntry={true}
          />
          <TouchableOpacity
            style={[buttonView.button, { marginTop: 50 }]}
            onPress={createUser}
          >
            <Text style={buttonView.buttonText}>Abschliessen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={textLink.container}
            onPress={() =>
              navigation.navigate("Login")
            }
          >
            <Text style={textLink.textLinkLeft}>&lt; Zurück</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
});