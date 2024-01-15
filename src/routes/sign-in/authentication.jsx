import React from 'react';

import "./authentication.style"

import SignUpForm from "../../components/SignUpForm/SignUpForm";
import SignInForm from "../../components/SignInForm/SignInForm";
import {Container} from "./authentication.style";

function Authentication() {

    return (
        <Container>
            <SignInForm />
            <SignUpForm />
        </Container>
    );
}

export default Authentication;