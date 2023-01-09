import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// import indexStyle from './styles/indexStyle';
import transactionsStyle from './styles/transactionsStyle';

import { auth } from "../firebase";
import { signOut } from 'firebase/auth';

export default function Home({ navigation }) {

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
          <Button
            title="Abmelden"
            onPress={handleSignOut}
          />
          <Button
            title="To create payment"
            onPress={() =>
              navigation.navigate('CreatePayment')
            }
          />
          <Button
            title="To create account"
            onPress={() =>
              navigation.navigate('CreateAccount')
            }
          />
        </View>
        <View style={styles.accounts}>
          <ScrollView
            horizontal={true}
          >
            <TouchableOpacity style={styles.account}>
              <Text style={styles.text}>Privatkonto</Text>
              <Text style={styles.text}>0.01 CHF</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.account}>
              <Text style={styles.text}>Sparkonto</Text>
              <Text style={styles.text}>6'999'420 CHF</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.account}>
              <Text style={styles.text}>Sparkonto</Text>
              <Text style={styles.text}>69'420 CHF</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.account}>
              <Text style={styles.text}>Sparkonto</Text>
              <Text style={styles.text}>69'420 CHF</Text>
            </TouchableOpacity>
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

          <View style={styles.container}>
            <Text>home</Text>
            <Button
              title="Abmelden"
              onPress={handleSignOut}
            />
            <Button
              title="To create payment"
              onPress={() =>
                navigation.navigate('CreatePayment')
              }
            />
            <Button
              title="To create account"
              onPress={() =>
                navigation.navigate('CreateAccount')
              }
            />
          </View>
        </ScrollView>
      </View>

      <StatusBar style="auto" />
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
    shadowColor: '#F1A661',
		shadowOpacity: 0.8,
		shadowRadius: 2,
		shadowOffset: {
			height: 1,
			width: 1
		}
  },
  navigation: {
    flexDirection: "row",
    flex: 1
  },
  accounts: {
    width: "100%",
    flex: 1
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