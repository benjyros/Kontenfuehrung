import React, { useState } from 'react';
import { Button, StyleSheet, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// import indexStyle from './styles/indexStyle';
import transactionsStyle from './styles/transactionsStyle';

import { auth } from "../firebase";
import { signOut } from 'firebase/auth';

export default function Home({ navigation }) {

  const [selected, setSelected] = useState(1);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigation.replace('Login');
    })
      .catch((error) => {
        alert(error.message);
      })
  }

  const accounts = [
    { id: 1, type: "Privatkonto", balance: "0.01 CHF" },
    { id: 2, type: "Sparkonto", balance: "6'999'420 CHF" },
    { id: 3, type: "Sparkonto", balance: "69'420 CHF" },
    { id: 4, type: "Sparkonto", balance: "69'420 CHF" },
  ];

  const getAccounts = () => {
    
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
                navigation.navigate('CreatePayment')
              }
            >
              <Text style={styles.navitemText}>Kontoübertrag</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navitem}
              onPress={() =>
                navigation.navigate('CreateAccount')
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
  },
  selected: {
    opacity: 0.2,
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