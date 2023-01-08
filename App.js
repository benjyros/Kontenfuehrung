import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Registration from './screens/Registration';
import Home from './screens/Home';
import CreatePayment from './screens/CreatePayment';
import CreatAccount from './screens/CreateAccount';

const { Navigator, Screen } = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Navigator
      initialRouteName='Login'
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="Login" component={Login}></Screen>
      <Screen name="Registration" component={Registration}></Screen>
      <Screen name="Home" component={Home}></Screen>
      <Screen name="CreatePayment" component={CreatePayment}></Screen>
      <Screen name="CreateAccount" component={CreatAccount}></Screen>
    </Navigator>
  </NavigationContainer>
)

export default App;