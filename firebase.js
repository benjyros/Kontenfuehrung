import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBZAj6XDkymOwb6PNSAng4UlZSivRNbHeM",
    authDomain: "kontenfuehrung.firebaseapp.com",
    projectId: "kontenfuehrung",
    storageBucket: "kontenfuehrung.appspot.com",
    messagingSenderId: "841043579781",
    appId: "1:841043579781:web:8a54e9c56af5135c78aaec",
    measurementId: "G-Y6C3DHCFEY"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export { auth }