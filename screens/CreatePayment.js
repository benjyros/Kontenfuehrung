import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import buttonView from './styles/buttonView';
import inputView from "./styles/inputView";
import textLink from './styles/textLink';

import createTransferDoc from "./functions/transaction";

import { auth, firestore } from "../firebase";
import { doc, getDoc, collection, setDoc, getDocs, query, where, updateDoc } from "firebase/firestore";

export default function CreatePayment({ navigation }) {
  const [debitAcc, setDebitAcc] = useState("");
  const [balance, setBalance] = useState("");
  const [iban, setIban] = useState("");
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    async function fetchData() {
      const q = query(collection(firestore, "users", auth.currentUser.uid, "accounts"), where("type", "==", "Privatkonto"));
      // Get document of query
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setDebitAcc(doc.data().iban);
        setBalance(doc.data().balance)
      });
    };
    fetchData();
  }, []);

  const preTransfer = () => {
    if (amount === "") {
      alert("Bitte geben Sie einen Betrag ein.");
    } else if (iban != "" && surname != "" && name != "") {
      tranfer();
    } else {
      alert("Bitte überprüfen Sie die Daten nochmals.");
    }
  }

  const tranfer = async () => {
    const q1 = query(collection(firestore, "users"), where("surname", "==", surname), where("name", "==", name));
    const querySnapshot1 = await getDocs(q1);

    if (querySnapshot1.empty) {
      alert("Dieser Empfänger existiert nicht.");
    }
    else {
      querySnapshot1.forEach(async (document) => {
        const q = query(collection(firestore, "users", document.data().id, "accounts"), where("iban", "==", iban));
        // Get document of query
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          alert("Die IBAN existiert nicht.")
        }
        else {
          const debitRef = doc(firestore, "users", auth.currentUser.uid, "accounts", debitAcc);
          const creditRef = doc(firestore, "users", document.data().id, "accounts", iban);

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
            createTransaction(document.data().id, document.data().surname, document.data().name);
          }
        }
      });
    }
  }

  const createTransaction = async (creditorId, receiverSurname, receiverName) => {
    const userSnap = await getDoc(doc(firestore, "users", auth.currentUser.uid));
    createTransferDoc(auth.currentUser.uid, creditorId, receiverSurname, receiverName, userSnap.data().surname, userSnap.data().name, debitAcc, iban, amount, "Zahlung");
    navigation.replace("Home");
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
              <Text style={styles.text}>{debitAcc} - {balance} CHF</Text>
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