import { initializeApp } from "firebase/app";
import {getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth"
import {getFirestore, getDoc, setDoc, doc, collection, writeBatch, query, getDocs} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6DJ41-r1zliuJKmHel6nKTnWZTbxEui8",
    authDomain: "onlnstr-7092b.firebaseapp.com",
    projectId: "onlnstr-7092b",
    storageBucket: "onlnstr-7092b.appspot.com",
    messagingSenderId: "1006654260542",
    appId: "1:1006654260542:web:7c134ffa4ced15959e586f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, googleProvider)
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey)
    const batch = writeBatch(db);

    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object)
    })

    await batch.commit()
    console.log("done")
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories')
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q)

    // Redux lesson update

    return querySnapshot.docs.map(docSnapshot => docSnapshot.data())

    // Commented in redux lesson
    // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    //     const {title, items} = docSnapshot.data()
    //     acc[title.toLowerCase()] = items
    //     return acc
    // }, {})
    //
    // return categoryMap
}

export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
    const userDocRef = doc(db, "users", userAuth.uid)

    // console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)

    // console.log(userSnapshot)
    // console.log(userSnapshot.exists())

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, email, createAt, ...additionalInfo
            })
        } catch (e) {
            console.log("error creating the user", e)
        }
    }
    return userSnapshot
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = () => signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        )
    })
}