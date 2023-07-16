import { auth } from "@/firebase/app";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

const RegisterSuccess = () => {

    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    function redirect() {
        router.push('/');
        return '';
    }

    return (
        (!user && !loading) ? redirect() : <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '5em',
        }}>
            <Typography variant="h2">
                Registered! You are now logged in!
            </Typography>
            <Link href='/'>
                <Typography variant="h6">
                    Return home
                </Typography>
            </Link>
        </Box>

    );

}

export default RegisterSuccess;