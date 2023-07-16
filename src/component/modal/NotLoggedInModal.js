import { Box, Button, Link, Modal, Typography } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
    outline: '2px solid rgba(0,0,0,0.4)'
}

const NotLoggedInModal = ({ open, setOpen }) => {
    return (
        <Modal
            sx={{ outline: 0 }}
            open={open}
            onClose={() => setOpen(false)}
        >
            <Box sx={style}>
                <Typography variant="h5" component="h2" sx={{ marginBottom: '1em' }}>
                    Not logged in.
                </Typography>
                <Link href="/signin">
                    <Button variant="contained">
                        <Typography variant="h6">
                            Sign in
                        </Typography>
                    </Button>
                </Link>
            </Box>
        </Modal>
    );

}

export default NotLoggedInModal;