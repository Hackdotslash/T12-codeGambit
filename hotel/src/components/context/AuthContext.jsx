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

    function signup(email, password, name) {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((cred) => {
                return db.collection("users").doc(cred.user.uid).set({
                    name: name,
                    role: 0,
                });
            })
            .catch(function (err) {
                console.log("SIGNIN ERROR", err);
            });
    }

    function signin(email, password) {
        return auth
            .signInWithEmailAndPassword(email, password)
            .then(async (cred) => {
                await db
                    .collection("users")
                    .doc(cred.user.uid)
                    .get()
                    .then((doc) => {
                        var role = doc.data().role;
                        if (role === 1) {
                            console.log("ADMIN");
                            return <Redirect to="/admin/dashboard" />;
                        } else {
                            console.log("USER");
                            return <Redirect to="/user/dashboard" />;
                        }
                    });
                /*.catch((err) => {
                    console.error("ROLE ERROR", err);
                  });*/
            })
            .catch((err) => {
                console.error("SIGNIN ERROR", err);
            });
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
