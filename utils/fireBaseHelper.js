// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


export const getFireBaseApp = () => {
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyAS5E9MBzFDPYw9XGKrqhdmE1z4YwQ_gfU",
        authDomain: "whatsapp-7e84c.firebaseapp.com",
        projectId: "whatsapp-7e84c",
        storageBucket: "whatsapp-7e84c.appspot.com",
        messagingSenderId: "946547024909",
        appId: "1:946547024909:web:2a8aa708ad391ad6416144",
        measurementId: "G-K65JQC0ZVB"
      };
    // Initialize Firebase
    return initializeApp(firebaseConfig);
}
