import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View, InputAccessoryView } from 'react-native';
import { auth } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <View style={indexStyle.container}>
      <View style={indexStyle.header}>
        <Text style={indexStyle.title}>Kontenführung</Text>
      </View>
      <ScrollView
        scrollEnabled={false}
        style={indexStyle.main}
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
          />
          <TouchableOpacity
            style={textLink.textLinkViewRight}
            onPress={() =>
              navigation.navigate("Registration")
            }
          >
            <Text style={textLink.textLink}>Registrieren</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={buttonView.button}
            onPress={handleSignIn}
          >
            <Text style={buttonView.buttonText}>Anmelden</Text>
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