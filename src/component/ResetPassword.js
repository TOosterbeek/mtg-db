import { useState } from "react";

const { auth } = require("@/firebase/app");
const { Typography, FormControl, InputLabel, Input, Button, styled } = require("@mui/material");
const { useSendPasswordResetEmail } = require("react-firebase-hooks/auth");


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

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [sendPasswordResetEmail, sending, fbError] = useSendPasswordResetEmail(auth);

    const handleSubmit = async (event) => {
        event.preventDefault();

        await sendPasswordResetEmail(email);

        setSuccess(true);
    }


    return (
        <StyledFormContainer>
            {success ? (<Typography variant='h6'>
                Check your email
            </Typography>) : (
                <>
                    <Typography variant="h6">
                        Reset your password
                    </Typography>
                    <StyledForm onSubmit={handleSubmit}>
                        <FormControl>
                            <InputLabel htmlFor="emailInput">Email address</InputLabel>
                            <Input
                                required
                                name="email"
                                placeholder="email"
                                type="email"
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </FormControl>
                        <Button variant="contained" type="submit">
                            Reset Password
                        </Button>

                        {fbError && <Typography color={'red'} variant='body'>{fbError.message}</Typography>}

                    </StyledForm>
                </>)}
        </StyledFormContainer >
    )
}

export default ResetPassword;