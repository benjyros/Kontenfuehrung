import React, { useEffect, useState } from "react";
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import loginStyle from './styles/loginStyle';
import buttonView from './styles/buttonView';
import inputView from './styles/inputView';
import textLink from './styles/textLink';

import { auth, firestore } from "../firebase";
import { doc, getDoc, collection, setDoc, getDocs } from "firebase/firestore";


export default function Registration({ navigation }) {
	const [selectedValue, setSelectedValue] = useState("java");
	const [debitAcc, setDebitAcc] = useState("java");
	const [creditAcc, setCreditAcc] = useState("");
	const [amount, setAmount] = useState("");

	const transfer = () => {
		if(amount != ""){
			navigation.replace("Home");
		}else{
			alert("Bitte geben Sie einen Betrag ein.");
		}
	}

	return (
		<View style={loginStyle.container}>
			<ScrollView
				scrollEnabled={false}
				style={loginStyle.container}
				keyboardShouldPersistTaps='handled'
			>
				<View style={loginStyle.headerRegistration}>
					<Text style={loginStyle.title}>Registrierung</Text>
				</View>
			</ScrollView>
			<ScrollView
				scrollEnabled={false}
				style={styles.mainContainer}
				keyboardShouldPersistTaps='handled'
			>
				<View style={styles.container}>
					<View style={styles.pickers}>
						<Picker
							selectedValue={debitAcc}
							style={{ height: 50, width: "75%" }}
							onValueChange={(itemValue, itemIndex) => setDebitAcc(itemValue)}
						>
							<Picker.Item label="Java" value="java" />
							<Picker.Item label="JavaScript" value="js" />
							<Picker.Item label="Python" value="python" />
							<Picker.Item label="C++" value="cpp" />
							<Picker.Item label="C#" value="csharp" />
						</Picker>
						<Picker
							selectedValue={creditAcc}
							style={{ height: 25, width: "75%", marginTop: 50, }}
							onValueChange={(itemValue, itemIndex) => setCreditAcc(itemValue)}
						>
							<Picker.Item label="Java" value="java" />
							<Picker.Item label="JavaScript" value="js" />
							<Picker.Item label="Python" value="python" />
							<Picker.Item label="C++" value="cpp" />
							<Picker.Item label="C#" value="csharp" />
						</Picker>
					</View>

					<TextInput
						style={inputView.textInput}
						onChangeText={(amount) => setAmount(amount)}
						placeholder="z.B. 200"
					/>
					<TouchableOpacity
						style={[buttonView.button, { marginTop: 50 }]}
						onPress={transfer}
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
			</ScrollView>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
	},
	pickers: {
		justifyContent: "center",
	}
});