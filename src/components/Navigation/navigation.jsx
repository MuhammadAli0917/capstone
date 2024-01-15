import React, {useContext} from 'react';
import {Link, Outlet} from "react-router-dom";
import {ReactComponent as CrwnLogo} from "../../assets/crown.svg";
import "./navigation.styles"
import {UserContext} from "../../contexts/user.context";
import {signOutUser} from "../../utils/firebase/firebase";
import CartIcon from "../CartIcon/CartIcon";
import CartDropdown from "../CartDropdown/CartDropdown";
import {CartContext} from "../../contexts/cart.context";
import {LogoContainer, NavigationContainer, NavLinks, NavLink} from "./navigation.styles";

const Navigation = () => {

    const {currentUser, setCurrentUser} = useContext(UserContext)
    const {isCartOpen} = useContext(CartContext)

    return (
        <>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className="logo" />
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>

                    {currentUser ? (<span onClick={signOutUser} className="nav-link">SIGN OUT</span>)
                    : <NavLink to='/auth'>SIGN IN</NavLink>}

                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </>
    )
};

export default Navigation;