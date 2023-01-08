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