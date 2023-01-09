import React, { useEffect, useState } from "react";
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import buttonView from './styles/buttonView';
import textLink from './styles/textLink';

import { auth, firestore } from "../firebase";
import { doc, getDoc, collection, setDoc, getDocs, query, where } from "firebase/firestore";


export default function Registration({ navigation }) {
	const [debitAcc, setDebitAcc] = useState("");
	const [creditAcc, setCreditAcc] = useState("");
	const [amount, setAmount] = useState("");

	const [openDebitAcc, setOpenDebitAcc] = useState(false);
	const [openCreditAcc, setOpenCreditAcc] = useState(false);
	const [accounts, setAccounts] = useState([]);

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
						if (i === 0) {
							return doc.data().type;
						} else {
							return doc.data().type + " " + accounts.length;
						}
					}
					const newAccount = {
						label: getType() + ": " + doc.data().iban + " - " + doc.data().balance + " CHF",
						value: doc.data().iban
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


	const transfer = () => {
		if (debitAcc === creditAcc) {
			alert("Sie können nicht auf das gleiche Konto transferieren.");
		} else if (debitAcc === "" || creditAcc === "") {
			alert("Bitte geben Sie die Kontos an.");
		} else if (amount != "") {
			navigation.replace("Home");
		} else {
			alert("Bitte geben Sie einen Betrag ein.");
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<ScrollView
					scrollEnabled={false}
					keyboardShouldPersistTaps='handled'
				>
					<View style={styles.headerRegistration}>
						<Text style={styles.title}>Kontoübertrag</Text>
					</View>
				</ScrollView>
			</View>
			<View style={styles.main}>
				<ScrollView
					scrollEnabled={false}
					keyboardShouldPersistTaps='handled'
				>
					<View style={styles.container}>
						<View style={styles.pickers}>
							<View style={styles.picker}>
								<Text>Belastungskonto</Text>
								<DropDownPicker
									open={openDebitAcc}
									value={debitAcc}
									items={accounts}
									setOpen={setOpenDebitAcc}
									setValue={setDebitAcc}
									setItems={setAccounts}
									maxHeight={75}
									textStyle={{
										fontSize: 10
									}}
								/>
							</View>
							<View style={styles.picker}>
								<Text>Gutschriftskonto</Text>
								<DropDownPicker
									open={openCreditAcc}
									value={creditAcc}
									items={accounts}
									setOpen={setOpenCreditAcc}
									setValue={setCreditAcc}
									setItems={setAccounts}
									maxHeight={75}
									textStyle={{
										fontSize: 10
									}}
								/>
							</View>
						</View>
						<View style={styles.subcontent}>
							<View style={styles.amount}>
								<TextInput
									style={styles.textInput}
									onChangeText={(amount) => setAmount(amount)}
									placeholder="Betrag"
								/>
								<Text>CHF</Text>
							</View>
							<View style={styles.buttons}>
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
	},
	header: {
		flex: 1,
		backgroundColor: "red",
		width: "100%",
	},
	main: {
		flex: 4,
		backgroundColor: "blue",
		width: "100%",
	},
	pickers: {
		flex: 1,
		backgroundColor: "orange",
		width: "100%",
	},
	picker: {
		margin: 50,
	},
	subcontent: {
		flex: 1,
		backgroundColor: "yellow",
		width: "100%",
		justifyContent: "center",
	},
	amount: {
		flexDirection: "row",
		alignItems: "center",
		width: "75%",
		alignSelf: "center",
	},
	textInput: {
		backgroundColor: "#FFF",
		height: 50,
		width: 100,
		borderRadius: 5,
	},
	buttons: {
		width: "100%",
		alignItems: "center",
	}
});