import "./categories.styles.scss"
import {Route, Routes} from "react-router-dom";
import Home from "./routes/home/home";
import React, {useEffect} from "react";
import Navigation from "./components/Navigation/navigation";
import Authentication from "./routes/sign-in/authentication";
import Shop from "./components/Shop/shop";
import Checkout from "./routes/checkout/checkout";
import {createUserDocumentFromAuth, onAuthStateChangedListener} from "./utils/firebase/firebase";
import {setCurrentUser} from "./store/user/user.action";
import {useDispatch} from "react-redux";

function App() {
    const dispatch = useDispatch()


    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user)

            }
            dispatch(setCurrentUser(user))

        });

        return unsubscribe;
    }, []);


    return(
        <Routes>
            <Route path={"/"} element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path="shop/*" element={<Shop />} />
                <Route path="auth" element={<Authentication />} />
                <Route path="checkout" element={<Checkout />} />
            </Route>
        </Routes>
    )
}

export default App;
