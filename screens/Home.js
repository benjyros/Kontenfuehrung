import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import transactionsStyle from './styles/transactionsStyle';

import { auth, firestore } from "../firebase";
import { signOut } from 'firebase/auth';
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Home({ navigation }) {

  const [accounts, setAccounts] = useState([]);
  const [selected, setSelected] = useState(1);

  const selectedAccount = accounts.find(({ id }) => id === selected);

  useEffect(() => {
    async function fetchData() {
      // Defining all types of accounts
      var types = ["Privatkonto", "Sparkonto"];
      // Defining array for all accounts
      var accounts = [];
      let count = 0;
      //Looping through all types of accounts
      for (let i = 0; i < types.length; i++) {
        // Query accounts where {types[i]}
        const q = query(collection(firestore, "users", auth.currentUser.uid, "accounts"), where("type", "==", types[i]));
        // Get documents of query
        const querySnapshot = await getDocs(q);
        // Loop through all documents

        //create array of promises
        const promises = []
        
        for (const doc of querySnapshot.docs) {
          promises.push(getData(doc, i, count))
          count++;
        }
        //await all promises
        const newAccounts = await Promise.all(promises)
        //push all the newAccounts in accounts
        accounts.push(...newAccounts);
        
      }
      // Set useState with the accounts
      setAccounts(accounts);
    };
    fetchData();
  }, []);

  //function that return promise
  async function getData(doc, count, accounts) {
    // Get specific datas out of the document
    const getType = () => {
      if (count === 0) {
        return doc.data().type;
      } else {
        return doc.data().type + " " + accounts;
      }
    }

    var days = [];
    var transactions = [];
    var transactionDate = "";

    const transactionsRef = collection(firestore, "users", auth.currentUser.uid, "accounts", doc.data().iban, "transactions");
    const transactionsSnap = await getDocs(transactionsRef);
    transactionsSnap.forEach((doc2) => {
      const transaction = {
        type: doc2.data().type,
        amount: doc2.data().amount,
        who: doc2.data().who
      }

      transactions[transactions.length] = transaction;

      var t = new Date(1970, 0, 1);
      t.setSeconds(doc2.id);

      if (transactionDate != t) {
        transactionDate = t;
        const day = {
          date: t,
          transactions: transactions,
        }
        days.push(day);

        transactions = [];
      }
    });

    const newAccount = {
      id: accounts + 1,
      type: getType(),
      balance: doc.data().balance + " CHF",
      transactions: days
    };

    days = [];

    return newAccount;
  }


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
          {selectedAccount && (
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
          )}
        </View>
      </View>
      <View style={styles.main}>
        {selectedAccount && (
          <ScrollView
            keyboardShouldPersistTaps='handled'
          >
            <View
              style={transactionsStyle.container}
            >
              <Text style={transactionsStyle.title}>Transaktionen</Text>
              {selectedAccount.transactions.map(({ date, transactions }, index) => (
                <View
                  key={index}
                  style={transactionsStyle.childContainer}
                >
                  <Text style={transactionsStyle.date}>{date.toDateString()}</Text>
                  {transactions.map(({ type, amount, who }, index) => (
                    <View
                      key={index}
                      style={transactionsStyle.transaction}
                    >
                      <Text style={transactionsStyle.text}>{type}: {amount} - {who}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
        )}
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