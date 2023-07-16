import { Box } from "@mui/material";
import { useEffect, useCallback } from "react";
import Card from "./Card";
import LoadingCard from "./LoadingCard";

const CardCatalog = ({ cards, next, loading, savedCards, saveCard }) => {

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    });

    const handleScroll = () => {
        if (loading) {
            return;
        }

        const docElement = document.documentElement;
        const documentScrolled = window.innerHeight + docElement.scrollTop;
        if (documentScrolled < document.documentElement.offsetHeight - 100) {
            return;
        }

        //TODO: properly debounce the request to be able to up the scroll trigger area without
        // creating more requests than necessary.
        // Leaving it for now because I cba and it doesnt break anything
        next();
    }

    const renderCards = useCallback(() => {
        return cards.map((card, idx) =>
            <Box key={idx} sx={{ position: 'relative' }}>
                <Card key={idx} card={card} saved={savedCards && savedCards.includes(card['id'])} setSaved={saveCard}>

                </Card>
            </Box>
        )
    }, [cards, saveCard, savedCards]);

    return (
        <>
            {renderCards()}
            {loading ? <LoadingCard loading={loading} /> : ''}
        </>
    );
}

export default CardCatalog;