import {useContext, useState} from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase";
import {FormInput} from "../FormInput/FormInput";
import "./SignUpForm.style"
import Button from "../Button/Button";
import {UserContext} from "../../contexts/user.context";
import {Container} from "./SignUpForm.style";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {displayName, email, password, confirmPassword} = formFields

    const {setCurrentUser} = useContext(UserContext)

    const resetForm = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword){
            alert("passwords do not match");
            return;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password)

            setCurrentUser(user)

            await createUserDocumentFromAuth(user,  {displayName})

            resetForm()
        } catch (e) {
            if (e.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use')
            } else {
                console.log("problem with creating a user", e)
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    }
    return (
        <Container>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" required name="displayName" value={displayName} onChange={handleChange} />

                <FormInput label="Email" type="email" required name="email" value={email} onChange={handleChange} />

                <FormInput label="Password" type="password" required name="password" value={password} onChange={handleChange} />

                <FormInput label="Confirm Password" type="password" required name="confirmPassword" value={confirmPassword} onChange={handleChange} />
                <Button buttonType="inverted" type="submit">Sign Up</Button>
            </form>
        </Container>
    )
}

export default SignUpForm