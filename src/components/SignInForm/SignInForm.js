import {useState} from "react";

import {FormInput} from "../FormInput/FormInput";
import Button from "../Button/Button";

import {
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopUp
} from "../../utils/firebase/firebase";

// import {UserContext} from "../../contexts/user.context";
import {ButtonsContainer, Container} from "./SignInForm.style";
import {useDispatch} from "react-redux";
import {emailSignInStart, googleSignInStart} from "../../store/user/user.action";

const defaultFormFields = {
    email: "",
    password: ""
}

const SignInForm = () => {
    const dispatch = useDispatch()
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {email, password} = formFields

    // const {setCurrentUser} = useContext(UserContext)

    const resetForm = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart())
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            dispatch(emailSignInStart(email, password))
            resetForm()
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    }

    return (
        <Container>
            <h2>Already have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Email" type="email" required name="email" value={email} onChange={handleChange} />

                <FormInput label="Password" type="password" required name="password" value={password} onChange={handleChange} />

                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType="google"  onClick={signInWithGoogle}>Google Sign In</Button>
                </ButtonsContainer>
            </form>
        </Container>
    )
}

export default SignInForm