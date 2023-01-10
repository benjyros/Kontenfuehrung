import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// import indexStyle from './styles/indexStyle';
import transactionsStyle from './styles/transactionsStyle';

import { auth, firestore } from "../firebase";
import { signOut } from 'firebase/auth';
import { doc, getDoc, collection, setDoc, getDocs, query, where } from "firebase/firestore";

export default function Home({ navigation }) {

  const [accounts, setAccounts] = useState([]);
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    async function fetchData() {
      // Defining all types of accounts
      var types = ["Privatkonto", "Sparkonto"];
      // Defining array for all accounts
      var accounts = [];
      //Looping through all types of accounts
      for (let i = 0; i < types.length; i++) {
        // Query accounts where {types[i]}
        const q = query(collection(firestore, "users", auth.currentUser.uid, "accounts"), where("type", "==", types[i]));
        // Get documents of query
        const querySnapshot = await getDocs(q);
        // Loop through all documents
        querySnapshot.forEach((doc) => {
          // Get specific datas out of the document
          const getType = () => {
            if(i === 0){
              return doc.data().type;
            }else{
              return doc.data().type + " " + accounts.length;
            }
          }

          const newAccount = {
            id: accounts.length + 1,
            type: getType(),
            balance: doc.data().balance + " CHF"
          };
          // Put datas into array for all accounts
          accounts[accounts.length] = newAccount;
        });
      }
      // Set useState with the accounts
      setAccounts(accounts);
    };
    fetchData();
  }, []);


  // Event handler when signing out
  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigation.replace('Login');
    })
      .catch((error) => {
        alert(error.message);
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.navigation}>
          <ScrollView
            horizontal={true}
          >
            <TouchableOpacity
              style={styles.navitem}
              onPress={handleSignOut}
            >
              <Text style={styles.navitemText}>Abmelden</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navitem}
              onPress={() =>
                navigation.navigate('CreatePayment')
              }
            >
              <Text style={styles.navitemText}>Zahlung erfassen</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navitem}
              onPress={() =>
                navigation.replace('AccountTransfer')
              }
            >
              <Text style={styles.navitemText}>Kontoübertrag</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navitem}
              onPress={() =>
                navigation.replace('CreateAccount')
              }
            >
              <Text style={styles.navitemText}>Sparkonto erstellen</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={styles.accounts}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {accounts.map((account) => (
              <TouchableOpacity
                key={account.id}
                style={[styles.account, selected === account.id ? styles.selected : null]}
                onPress={() => setSelected(account.id)}
              >
                <Text style={styles.title}>{account.type}</Text>
                <Text style={styles.text}>{account.balance}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <View style={styles.main}>
        <ScrollView
          keyboardShouldPersistTaps='handled'
        >
          <View style={transactionsStyle.container}>
            <Text style={transactionsStyle.title}>Transaktionen</Text>
            <View style={transactionsStyle.childContainer}>
              <Text style={transactionsStyle.date}>Datum</Text>
              <View style={transactionsStyle.transaction}>
                <Text style={transactionsStyle.text}>Lorem ipsum</Text>
                <Text style={transactionsStyle.text}>Lorem ipsum</Text>
              </View>
            </View>
            <View style={transactionsStyle.childContainer}>
              <Text style={transactionsStyle.date}>Datum</Text>
              <View style={transactionsStyle.transaction}>
                <Text style={transactionsStyle.text}>Lorem ipsum</Text>
                <Text style={transactionsStyle.text}>Lorem ipsum</Text>
              </View>
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
  },
  header: {
    flex: 2,
    width: "100%",
    backgroundColor: '#3F2045',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1,
    }
  },
  navigation: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  navitem: {
    margin: 10,
    padding: 10,
    alignItems: "center",
  },
  navitemText: {
    textDecorationLine: 'underline',
    color: "#FFF",
  },
  accounts: {
    width: "100%",
    flex: 1,
  },
  account: {
    backgroundColor: "#FFF",
    height: 125,
    width: 125,
    borderRadius: 5,
    margin: 10,
    paddingTop: 5,
    padding: 2,
    opacity: 0.2,
  },
  selected: {
    opacity: 1.0,
  },
  title: {
    fontWeight: "bold",
    alignSelf: "center",
    margin: 10,
  },
  text: {
    alignSelf: "center",
    margin: 10,
  },
  main: {
    flex: 3,
    paddingTop: 30,
    paddingHorizontal: 20,
  }
});