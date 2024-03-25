import React, { createContext, useEffect, useReducer } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase";
import {createAction} from "../utils/reducer/reducer";


export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const INITIAL_STATE = {
    currentUser: null,
};

const userReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return { ...state, currentUser: payload };
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
};

export const UserProvider = ({ children }) => {
    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user).then(() => {
                    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
                }).catch(error => {
                    console.error("Error creating user document:", error);
                });
            } else {
                dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, null))
            }
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
