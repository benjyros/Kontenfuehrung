import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View, InputAccessoryView } from 'react-native';

import loginStyle from './styles/loginStyle';
import buttonView from './styles/buttonView';
import inputView from './styles/inputView';
import textLink from './styles/textLink';

import { auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle auth changed if user is logged in or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("Home");
      } else {
        setEmail("");
        setPassword("");
      }
      return unsubscribe;
    });
  }, []);

  // Hanlder for signing in user
  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
      })
      .catch((error) => {
        alert("Dieses Konto existiert nicht oder die Angaben sind inkorrekt.");
      });
  }

  return (
    <View style={loginStyle.container}>
      <ScrollView
        scrollEnabled={false}
        style={loginStyle.container}
        keyboardShouldPersistTaps='handled'
      >
        <View style={loginStyle.headerLogin}>
          <Text style={loginStyle.title}>Twäwis</Text>
          <Text style={loginStyle.title}>Onlinebanking</Text>
        </View>
      </ScrollView>
      <ScrollView
        scrollEnabled={false}
        style={loginStyle.main}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.container}>
          <TextInput
            style={inputView.textInput}
            onChangeText={(email) => setEmail(email)}
            placeholder="E-Mail"
          />
          <TextInput
            style={inputView.textInput}
            onChangeText={(password) => setPassword(password)}
            placeholder="Passwort"
            secureTextEntry={true}
          />
          <TouchableOpacity
            style={[buttonView.button, { marginTop: 50 }]}
            onPress={handleSignIn}
          >
            <Text style={buttonView.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={textLink.container}
            onPress={() =>
              navigation.navigate("Registration")
            }
          >
            <Text style={textLink.textLinkMid}>Noch kein Konto? Hier Registrieren</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "30%",
    alignItems: "center",
    flex: 1,
  },
});