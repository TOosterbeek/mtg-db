import { auth } from '@/firebase/app';
import { Button, Typography } from '@mui/material';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

const SignInWithProvider = () => {
    const [signInWithGoogle, user, loading, fbError] = useSignInWithGoogle(auth);

    return (
        <>
            <Button variant='outlined' onClick={() => signInWithGoogle()}>
                Login with Google
            </Button>

            {fbError && <Typography>{fbError.message}</Typography>}
        </>
    );
};

export default SignInWithProvider;