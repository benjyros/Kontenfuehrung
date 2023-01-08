import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import loginStyle from './styles/loginStyle';
import buttonView from './styles/buttonView';
import inputView from './styles/inputView';
import textLink from './styles/textLink';

import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";


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
			navigation.replace('Home');
		})
		.catch((error) => {
			alert("Bitte überprüfen Sie ihre Angaben.");
		});
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