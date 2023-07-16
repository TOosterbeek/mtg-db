import axios from "axios";
import { useEffect, useState } from "react";

function useScryfallCardCollection(identifiers) {
    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        if (!identifiers) return;

        if (identifiers.length > 75) {
            throw 'Can only make a request with a maximum of 75 identifiers';
        }

        fetch();

        async function fetch() {
            const ids = { identifiers: identifiers };

            setLoading(true);
            const cards = await axios.post('https://api.scryfall.com/cards/collection',
                ids
            ).then(res => res['data']['data']);

            setCards(cards);
            setLoading(false);
        }

    }, [identifiers, cards]);

    return [cards, loading];
}

export default useScryfallCardCollection;