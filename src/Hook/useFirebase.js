import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import initialization from "../Components/Firebase/Firebase.init";

initialization();
const useFirebase = () => {
    const [user, setUser ] = useState({});
    const [error, setError] = useState('');
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    
    const signInUsingGoogle = () => {
        signInWithPopup(auth, googleProvider) 
        .then(result => {
            console.log(result.user);
            setUser(result.user);
        })
        .catch(error => {
            setError(error.message);
        })
    }
    const logout = () => {
        signOut(auth)
        .then( () => {
            setUser({})
        })
    }
    useEffect( () => {
        onAuthStateChanged(auth, user => {
            if(user) {
                console.log('inside the state change', user);
                setUser(user);
            }
        })
    },[])
    return {
        user,
        error,
        signInUsingGoogle,
        logout
    }
}

export default useFirebase;