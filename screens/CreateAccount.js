import { StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import inputView from './styles/inputView';
import buttonView from './styles/buttonView';
import textLink from './styles/textLink';

import createIban from './functions/iban';

import { auth, firestore } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useState } from 'react';

export default function CreatAccount({ navigation }) {

  const [name, setName] = useState("");
  const [interest, setInterest] = useState("");

  // Create saving account for user
  const createAccount = () => {
    if(name != "" && interest != ""){
      writeIntoDB();
    }
    else{
      alert("Bitte überprüfen Sie Ihre daten nochmals.")
    }
  }

  const writeIntoDB = async () => {
    const iban = createIban();
    await setDoc(doc(firestore, "users", auth.currentUser.uid, "accounts", iban), {
      iban: iban,
      type: "Sparkonto",
      name: name,
      interest: interest,
      balance: 0,
    });
    navigation.replace("Home");
  }

  function handleChange(interest) {
    console.log(isNaN(interest));
    if (isNaN(interest) === true) {
      console.log("h");
      setInterest("");
    } else {
      console.log("a");
      setInterest(interest);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <ScrollView
          scrollEnabled={false}
          keyboardShouldPersistTaps='handled'
        >
          <View style={styles.header}>
            <Text style={styles.title}>Sparkonto erstellen</Text>
          </View>
        </ScrollView>
      </View>
      <View>
        <ScrollView
          scrollEnabled={false}
          keyboardShouldPersistTaps='handled'
        >
          <View style={styles.container}>
            <View style={styles.inputs}>
              <TextInput
                style={inputView.textInput}
                onChangeText={(name) => setName(name)}
                placeholder="Benennung"
              />
            </View>
            <View style={styles.amount}>
              <TextInput
                style={styles.textInput}
                keyboardType="decimal-pad"
                onChangeText={(interest) => handleChange(interest)}
                placeholder="Zinssatz"
              />
              <Text style={[styles.text, { marginLeft: 30 }]}>%</Text>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={[buttonView.button, { marginTop: 50 }]}
                onPress={createAccount}
              >
                <Text style={buttonView.buttonText}>Sparkonto eröffnen</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={textLink.container}
                onPress={() =>
                  navigation.replace("Login")
                }
              >
                <Text style={textLink.textLinkLeft}>&lt; Abbrechen</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: '#3F2045',
  },
  header: {
    width: '100%',
    height: 250,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 25,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
  inputs: {
    alignItems: "center",
  },
  amount: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    width: "75%",
    alignSelf: "center",
  },
  textInput: {
    backgroundColor: "#FFF",
    height: 40,
    width: 100,
    borderRadius: 5,
    padding: 10
  },
  text: {
    color: "#FFF",
  },
  buttons: {
    width: "100%",
    alignItems: "center",
  }
});