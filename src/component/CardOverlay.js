import { StarBorder } from "@mui/icons-material";
import Star from "@mui/icons-material/Star";
import { Box } from "@mui/material";

import styles from './CardOverlay.module.scss';
import { useState } from "react";

const CardOverlay = ({ saved, onSave }) => {

    return (
        <Box sx={
            {
                position: 'absolute',
                backgroundColor: 'rgba(0,0,0,0.35)',
                left: 0,
                top: 0,
                borderRadius: '3.3%',
                width: 300,
                height: 418,
            }
        } >
            <Box className={styles.backgroundStar} onClick={() => onSave(!saved)}>
                {saved ? <Star fontSize="large" className={styles.starSaved}></Star> : <StarBorder fontSize="large" className={styles.star}></StarBorder>}
            </Box>
        </Box >

    );

}

export default CardOverlay;