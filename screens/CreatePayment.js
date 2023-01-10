import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import buttonView from './styles/buttonView';
import inputView from "./styles/inputView";
import textLink from './styles/textLink';

import { auth, firestore } from "../firebase";
import { doc, getDoc, collection, setDoc, getDocs, query, where, updateDoc } from "firebase/firestore";

export default function CreatePayment({ navigation }) {
  const [account, setAccount] = useState("");

  useEffect(() => {
    async function fetchData() {
      const q = query(collection(firestore, "users", auth.currentUser.uid, "accounts"), where("type", "==", "Privatkonto"));
      // Get document of query
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setAccount(doc.data().iban + " - " + doc.data().balance + " CHF");
      });
    };
    fetchData();
  }, []);

  const preTransfer = () => {
    if (debitAcc === creditAcc) {
      alert("Sie können nicht auf das gleiche Konto transferieren.");
    } else if (debitAcc === "" || creditAcc === "") {
      alert("Bitte geben Sie die Kontos an.");
    } else if (amount != "") {
      tranfer();
    } else {
      alert("Bitte geben Sie einen Betrag ein.");
    }
  }

  const tranfer = async () => {
    const debitRef = doc(firestore, "users", auth.currentUser.uid, "accounts", debitAcc);
    const creditRef = doc(firestore, "users", auth.currentUser.uid, "accounts", creditAcc);

    const debitSnap = await getDoc(debitRef);
    const creditSnap = await getDoc(creditRef);

    if (Number(debitSnap.data().balance) < Number(amount)) {
      alert("Der Betrag ist zu hoch als das Ihr Konto zur Verfügung hat.");
    } else {
      await updateDoc(debitRef, {
        balance: (Number(debitSnap.data().balance) - Number(amount))
      });

      await updateDoc(creditRef, {
        balance: (Number(creditSnap.data().balance) + Number(amount))
      });
      navigation.replace("Home");
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <ScrollView
          scrollEnabled={false}
          keyboardShouldPersistTaps='handled'
        >
          <View style={styles.headerRegistration}>
            <Text style={styles.title}>Zahlung erfassen</Text>
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
                onChangeText={(iban) => setIban(iban)}
                placeholder="IBAN"
              />
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
            </View>
            <View style={{ width: "75%", alignSelf: "center" }}>
              <Text style={styles.text}>Belastung auf Privatkonto:</Text>
              <Text style={styles.text}>{account}</Text>
            </View>
            <View style={styles.amount}>
              <TextInput
                style={styles.textInput}
                onChangeText={(amount) => setAmount(amount)}
                placeholder="Betrag"
              />
              <Text style={[styles.text, { marginLeft: 30 }]}>CHF</Text>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={[buttonView.button, { marginTop: 50 }]}
                onPress={preTransfer}
              >
                <Text style={buttonView.buttonText}>Ausführen</Text>
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
  headerRegistration: {
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
  },
  text: {
    color: "#FFF",
  },
  buttons: {
    width: "100%",
    alignItems: "center",
  }
});