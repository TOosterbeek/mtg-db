import { auth } from "@/firebase/app";
import { FormControl } from "@mui/base";
import { Button, FormLabel, Input, InputLabel, styled, Typography } from "@mui/material";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";


const StyledFormContainer = styled('div')(({ theme }) => ({
    position: 'relative',
    width: '100%',
    height: '85vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
}));

const StyledForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '1em',
    marginTop: '1em',
    border: `solid 1px ${theme.palette.common.black}`,
    borderRadius: '10px',
    padding: '1.5em',
}));


const SignInWithEmailPassword = () => {
    const router = useRouter();

    const [signInForm, setSignInForm] = useState({
        email: '',
        password: '',
    });

    const [signInWithEmailAndPassword, user, loading, fbError] = useSignInWithEmailAndPassword(auth);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const credentials = await signInWithEmailAndPassword(signInForm.email, signInForm.password);

        if (credentials) {
            router.push('/');
        }

    };

    const handleChange = (event) => {
        setSignInForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    return (
        <StyledFormContainer>
            <Typography variant="h6">
                Sign in
            </Typography>
            <StyledForm onSubmit={handleSubmit}>
                <FormControl>
                    <InputLabel htmlFor="emailInput">Email address</InputLabel>
                    <Input
                        required
                        name="email"
                        placeholder="email"
                        type="email"
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="passwordInput">Password</InputLabel>
                    <Input
                        required
                        id="passwordInput"
                        name="password"
                        type="password"
                        onChange={handleChange}
                    />
                </FormControl>

                <Button variant="contained" type="submit">
                    Sign in
                </Button>
            </StyledForm>
            {fbError && (<Typography variant="body1" color={'red'}>{fbError?.customData['message']}</Typography>)}
            <Link href='/resetpassword'>
                Forgot your password?
            </Link>
            <Link href='/registeruser'>
                Register an account
            </Link>
        </StyledFormContainer>
    )
}

export default SignInWithEmailPassword;