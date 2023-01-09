import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

import { auth } from "../firebase";
import { signOut } from 'firebase/auth';

export default function Home ({ navigation }) {

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigation.replace('Login');
    })
      .catch((error) => {
        alert(error.message);
      })
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});