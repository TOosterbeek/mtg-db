const { Box, CircularProgress } = require("@mui/material")

const LoadingCard = ({ loading }) => {
    return (
        <Box sx={
            {
                width: '300px',
                height: '418px',
                border: '1px solid gray',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '3.3%',
                backgroundColor: 'whitesmoke'
            }
        }>
            <CircularProgress size={50} />
        </Box>
    )
}

export default LoadingCard;