import { getDocs, collection } from "firebase/firestore";
import { firestore } from "../../firebase";


export default function createIban() {
    var iban = "";
    do {

        // Generate a random domestic bank account number
        const accountNumber = Math.random().toString(36).substring(2);
        // Generate a random check digit
        const checkDigit = Math.floor(Math.random() * 10);
        // Use a predefined country code
        const countryCode = 'TWWIS';
        // Concatenate the country code, check digit, and domestic bank account number to form the IBAN
        iban = countryCode + checkDigit + accountNumber;
    } while (ibanExists(iban) === true);

    return iban;
}

const ibanExists = async (iban) => {
    var exists = false;
    const usersSnap = await getDocs(collection(firestore, "users"));
    usersSnap.forEach(async (user) => {

        const accountsSnap = await getDocs(collection(firestore, "users", user.data().id, "accounts"));

        accountsSnap.forEach((account) => {
            if (account.data().iban === iban) {
                exists = true;
                return exists;
            }
        });
    });
    return exists;
}