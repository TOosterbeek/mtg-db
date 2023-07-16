import { auth } from "@/firebase/app";
import { Button, Input, InputLabel, styled, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

import { useState } from "react";
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

const SignUp = () => {
    const router = useRouter();

    const [signUpForm, setSignUpForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [createUserWithEmailAndPassword, user, loading, fbError] = useCreateUserWithEmailAndPassword(auth);

    const handleChange = (event) => {
        setSignUpForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (error) setError('');

        if (signUpForm.password !== signUpForm.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);

        router.push('registersuccess');
    };

    return (
        <StyledFormContainer>
            <Typography variant="h6">
                Sign up
            </Typography>
            <StyledForm onSubmit={handleSubmit}>
                <FormControl>
                    <InputLabel htmlFor="emailInput">Email address</InputLabel>
                    <Input
                        required
                        id="emailInput"
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
                <FormControl>
                    <InputLabel htmlFor="confirmPasswordInput">Confirm Password</InputLabel>
                    <Input
                        required
                        id="confirmPasswordInput"
                        name="confirmPassword"
                        type='password'
                        onChange={handleChange}
                    />
                </FormControl>
                <Button variant="contained" type="submit">
                    Signup
                </Button>
            </StyledForm>
            {(error || fbError) && (<Typography variant="body1" color={'red'}>{error || fbError?.message}</Typography>)}
        </StyledFormContainer>
    );
};

export default SignUp;
