import {takeLatest, all, call, put} from "redux-saga/effects"


import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    getCurrentUser,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopUp, signOutUser
} from "../../utils/firebase/firebase";
import {signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed, signUpSuccess} from "./user.action";
import {USER_ACTION_TYPES} from "./user.types";
import {createUserWithEmailAndPassword} from "firebase/auth";

export function* getSnapshotFromUserAuth(userAuth, additinalDetails) {
    try{
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additinalDetails)
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    } catch (error) {
        yield put(signInFailed(error))
    }
}

export function* signInWithGoogle() {
    try{
        const {user} = yield call(signInWithGooglePopUp)
        yield call(getSnapshotFromUserAuth, user)
    } catch (e) {
        yield put(signInFailed(e))
    }
}

export function* signInWithEmail({payload: {email, password}}) {
    try{
        const {user} = yield call(signInAuthUserWithEmailAndPassword, email, password)
        yield call(getSnapshotFromUserAuth, user)
    } catch (e) {
        yield put(signInFailed(e))
    }
}

export function* isUserAuthenticated() {
    try{
        const userAuth = yield call(getCurrentUser)
        if (!userAuth) return
        yield call(getSnapshotFromUserAuth, userAuth)
    } catch (error) {
        yield put(signInFailed(error))
    }
}

export function* signUp({payload: {email, password, displayName}}) {
    try{
        const {user} = yield call(createAuthUserWithEmailAndPassword, email, password)
        yield put(signUpSuccess(user, {displayName}))
    } catch (e) {
        yield put(signUpFailed(e))
    }
}

export function* signInAfterSignUp({payload: {user, additionalDetails}}) {
    yield call(getSnapshotFromUserAuth, user, additionalDetails)
}



export function* signOut(user) {
    try {
        yield call(signOutUser)
        yield put(signOutSuccess())
    } catch (e) {
        yield put(signOutFailed(e))
    }
}

// next level generators

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

export function* userSaga() {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart)
    ])
}