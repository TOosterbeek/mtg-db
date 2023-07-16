import CardCatalog from "@/component/CardCatalog";
import { auth } from "@/firebase/app";
import { getSavedCards } from "@/repository/CardRepository";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Favourites() {
    const [user, loading] = useAuthState(auth);
    const [loadingCards, setLoadingCards] = useState(true);
    const [savedCards, setSavedCards] = useState([]);

    useEffect(() => {
        if (!user) return;

        setLoadingCards(true);

        getSavedCards(user).then((cards) => {
            setSavedCards(cards);
            setLoadingCards(false);
        });

    }, [user]);

    async function unSaveCard(card, _) {
        await axios.post(`/api/cards/${user.uid}/unsave`, { card: card['id'] }).catch((error) => {
            console.error(error);
        });

        setSavedCards(savedCards.filter((savedCard) => savedCard !== card));
    }

    return (
        <>
            <Box sx={
                {
                    display: 'flex',
                    flexDirection: 'row',
                    width: '98vw',
                    flexWrap: 'wrap',
                    gap: '0.5em',
                    marginTop: '1em',
                    justifyContent: 'center',
                    paddingTop: '4em',
                }
            }>
                {(!loadingCards && savedCards.length === 0) && <Typography variant="h6">No cards saved</Typography>}
                <CardCatalog
                    cards={savedCards}
                    loading={loadingCards}
                    savedCards={savedCards.map((card) => card['id'])}
                    saveCard={unSaveCard}
                    next={() => { }}
                >
                </CardCatalog>
            </Box>
        </>
    )

}