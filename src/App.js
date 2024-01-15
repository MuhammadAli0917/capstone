import "./categories.styles.scss"
import {Outlet, Route, Routes} from "react-router-dom";
import Home from "./routes/home/home";
import React from "react";
import Navigation from "./components/Navigation/navigation";
import Authentication from "./routes/sign-in/authentication";
import Shop from "./components/Shop/shop";
import Checkout from "./routes/checkout/checkout";

function App() {


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
