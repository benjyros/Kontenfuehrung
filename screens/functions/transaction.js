import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase";


export default async function createTransferDoc(userid, surname, name, debitAcc, creditAcc, amount) {
    var currentTimeInSeconds = Math.round(new Date().getTime() / 1000);
    setDoc(doc(firestore, "users", userid, "accounts", debitAcc, "transactions", currentTimeInSeconds.toString()), {
        timestamp: currentTimeInSeconds,
        amount: "-" + amount + " CHF",
        type: "Kontoübertrag",
        receiver: surname + " " + name
    });
    setDoc(doc(firestore, "users", userid, "accounts", creditAcc, "transactions", currentTimeInSeconds.toString()), {
        timestamp: currentTimeInSeconds,
        amount: "+" + amount + " CHF",
        type: "Kontoübertrag",
        receiver: surname + " " + name
    });
}