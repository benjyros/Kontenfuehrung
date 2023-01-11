import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import buttonView from './styles/buttonView';
import textLink from './styles/textLink';
import inputView from "./styles/inputView";

import createTransferDoc from "./functions/transaction";

import { auth, firestore } from "../firebase";
import { doc, getDoc, collection, setDoc, getDocs, query, where, updateDoc, serverTimestamp } from "firebase/firestore";


export default function Registration({ navigation }) {
	const [debitAcc, setDebitAcc] = useState("");
	const [creditAcc, setCreditAcc] = useState("");
	const [amount, setAmount] = useState("");
	const [comment, setComment] = useState("");

	const [openDebitAcc, setOpenDebitAcc] = useState(false);
	const [openCreditAcc, setOpenCreditAcc] = useState(false);
	const [accounts, setAccounts] = useState([]);
	const [debitAccs, setDebitAccs] = useState([]);

	useEffect(() => {
		async function fetchData() {
			// Defining all types of accounts
			var types = ["Privatkonto", "Sparkonto"];
			// Defining array for all accounts
			var debitAccs = [];
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
					if (doc.data().balance != "0") {
						debitAccs[debitAccs.length] = newAccount;
					}
					accounts[accounts.length] = newAccount;
				});
			}
			// Set useState with the accounts

			setAccounts(accounts);
			setDebitAccs(debitAccs);
		};
		fetchData();
	}, []);


	const preTransfer = () => {
		if (debitAcc === creditAcc) {
			alert("Sie können nicht auf das gleiche Konto transferieren.");
		} else if (debitAcc === "" || creditAcc === "") {
			alert("Bitte geben Sie die Kontos an.");
		} else if (amount != "") {
			transfer();
		} else {
			alert("Bitte überprüfen Sie Ihre daten nochmals.");
		}
	}

	const transfer = async () => {
		const debitRef = doc(firestore, "users", auth.currentUser.uid, "accounts", debitAcc);
		const creditRef = doc(firestore, "users", auth.currentUser.uid, "accounts", creditAcc);

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
			createTransaction();
		}
	}

	const createTransaction = async () => {
		const userSnap = await getDoc(doc(firestore, "users", auth.currentUser.uid));
		createTransferDoc(auth.currentUser.uid, auth.currentUser.uid, userSnap.data().surname, userSnap.data().name, userSnap.data().surname, userSnap.data().name, debitAcc, creditAcc, amount, comment, "Kontoübertrag");
		navigation.replace("Home");
	}

	function handleChange(interest) {
		if (isNaN(interest)) {
			setAmount("");
		} else {
			setAmount(interest);
		}
	}

	return (
		<View style={styles.container}>
			<View>
				<ScrollView
					scrollEnabled={false}
					keyboardShouldPersistTaps='handled'
				>
					<View style={styles.header}>
						<Text style={styles.title}>Kontoübertrag</Text>
					</View>
				</ScrollView>
			</View>
			<View>
				<ScrollView
					scrollEnabled={false}
					keyboardShouldPersistTaps='handled'
				>
					<View style={styles.container}>
						<View style={styles.picker}>
							<Text style={[styles.text, { marginBottom: 10 }]}>Belastungskonto</Text>
							<DropDownPicker
								open={openDebitAcc}
								value={debitAcc}
								items={debitAccs}
								setOpen={setOpenDebitAcc}
								onOpen={setOpenCreditAcc}
								setValue={setDebitAcc}
								setItems={setDebitAccs}
								maxHeight={60}
								textStyle={{
									fontSize: 10
								}}
							/>
						</View>
						<View style={styles.picker}>
							<Text style={[styles.text, { marginBottom: 10 }]}>Gutschriftskonto</Text>
							<DropDownPicker
								open={openCreditAcc}
								value={creditAcc}
								items={accounts}
								setOpen={setOpenCreditAcc}
								onOpen={setOpenDebitAcc}
								setValue={setCreditAcc}
								setItems={setAccounts}
								maxHeight={60}
								textStyle={{
									fontSize: 10
								}}

							/>
						</View>
						<View style={styles.inputs}>
							<TextInput
								style={inputView.textInput}
								onChangeText={(comment) => setComment(comment)}
								placeholder="Kommentar"
							/>
						</View>
						<View style={styles.amount}>
							<TextInput
								style={styles.textInput}
								keyboardType="decimal-pad"
								onChangeText={(amount) => handleChange(amount)}
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
	header: {
		width: '100%',
		height: 150,
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingBottom: 25,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 20,
		color: '#fff',
	},
	picker: {
		margin: 30,
		width: "75%",
		alignSelf: "center",
	},
	inputs: {
		marginTop: 20,
		alignItems: "center",
	},
	amount: {
		marginTop: 20,
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
		padding: 10,
	},
	text: {
		color: "#FFF",
	},
	buttons: {
		width: "100%",
		alignItems: "center",
	}
});