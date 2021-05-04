import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

export default async ({ store }) => {
    const firebaseConfig = {
        apiKey: "AIzaSyCl1_2ZI5YcV-6x5hedCECAAor_K5DmJRI",
        authDomain: "cv4hire-2f592.firebaseapp.com",
        projectId: "cv4hire-2f592",
        storageBucket: "cv4hire-2f592.appspot.com",
        messagingSenderId: "537460042611",
        appId: "1:537460042611:web:cf31e3a7578c5f4c29b306",
        measurementId: "G-BN0QS60PJ5"
    };

    firebase.initializeApp(firebaseConfig);
    // firebase.analytics();

    // Check if user signed in before. If yes set currentUser state in vuex
    // firebase.auth().onAuthStateChanged(function (user) {
    //     if (user) {
    //         const currentUser: User = new User(
    //             user.uid,
    //             user.email!,
    //             user.displayName!,
    //             user.emailVerified
    //         );
    //         store.commit("firebase/setUser", currentUser);
    //     }
    // });
}