import { StarOutline } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useState } from "react";
import CardOverlay from "./CardOverlay";

const { default: Image } = require("next/image")

const Card = ({ card, saved, setSaved }) => {

    const [showOverlay, setShowOverlay] = useState();

    return (
        <Box
            onMouseEnter={() => {
                setShowOverlay(true);
            }}
            onMouseLeave={() => {
                setShowOverlay(false);
            }}>

            <Image
                src={card['image_uris']['normal']}
                alt={card['name']}
                width={300}
                height={418}
                style={{
                    borderRadius: '3.3%'
                }}
            >
            </Image>
            {showOverlay &&
                <CardOverlay saved={saved} onSave={(isSaved) => { setSaved(card, isSaved) }} />

            }
        </Box>
    )

}

export default Card;