import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Login ({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
			<Button
        title="To login"
        onPress={() =>
          navigation.navigate('Login')
        }
    	/>
      <Button
        title="To registration"
        onPress={() =>
          navigation.navigate('Registration')
        }
    	/>
			<Button
        title="To home"
        onPress={() =>
          navigation.navigate('Home')
        }
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