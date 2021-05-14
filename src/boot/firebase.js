import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
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

    // Check if user signed in before. If yes set currentUser state in vuex
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            // loading firestore
            firebase
                .firestore().collection("professionals").get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        if (doc.id == user.uid) {
                            const currentUser = {
                                uid: user.uid,
                                email: user.email,
                                verified: user.emailVerified,
                                name: doc.get("name"),
                                birthdate: doc.get("birthday"),
                                job_id: doc.get("job_id"),
                                city_id: doc.get("city_id"),
                                religion_id: doc.get("religion_d"),
                                gender_id: doc.get("gender_id"),
                            };
                            store.commit("main/login", currentUser);
                        }
                    });
                });
        }
    });
}