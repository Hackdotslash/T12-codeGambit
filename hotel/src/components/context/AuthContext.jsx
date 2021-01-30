import React, { useContext, useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { auth, db } from "../../firebase";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    const [loading, setloading] = useState(true);

    function signup(email, password, name, gstn) {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((cred) => {
                return db.collection("hotels").doc(cred.user.uid).set({
                    name: name,
                    gstn: gstn,
                });
            })
            .catch(function (err) {
                console.log("SIGNIN ERROR", err);
            });
    }

    function signin(email, password) {
        return auth
            .signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }
    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setloading(false);
        });
        return unsub;
    }, []);

    const value = {
        currentUser,
        signup,
        signin,
        logout,
    };
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
