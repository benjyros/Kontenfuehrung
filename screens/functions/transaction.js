import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase";


export default async function createTransferDoc(debitorId, creditorId, receiverSurname, receiverName, senderSurname, senderName, debitAcc, creditAcc, amount, comment, type) {
    var currentTimeInSeconds = Math.round(new Date().getTime() / 1000);
    setDoc(doc(firestore, "users", debitorId, "accounts", debitAcc, "transactions", currentTimeInSeconds.toString()), {
        timestamp: currentTimeInSeconds,
        amount: "- " + amount + " CHF",
        comment: comment,
        type: type,
        who: "an " + receiverSurname + " " + receiverName
    });
    setDoc(doc(firestore, "users", creditorId, "accounts", creditAcc, "transactions", currentTimeInSeconds.toString()), {
        timestamp: currentTimeInSeconds,
        amount: "+"  + amount + " CHF",
        comment: comment,
        type: type,
        who: "von " + senderSurname + " " + senderName
    });
}