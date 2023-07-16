const { useEffect } = require("react");

import { getCardNamesInRange } from "@/repository/CardRepository";
import { useState } from "react";

// TODO: Refactor to use with service to fetch from the api
// and switch to axios
function useScryfallCardCatalog(cardsPerPage) {
    const [loading, setLoading] = useState(false);
    const [cards, setCards] = useState([]);

    const [page, setPage] = useState(1);

    useEffect(() => {
        buildCards();

        async function buildCards() {
            setLoading(true);

            const names = await getCardNamesInRange((page - 1) * cardsPerPage, (page * cardsPerPage))
                .then(res => res['data']);

            const identifiers = buildCardIdentifiersJSON(names);
            const cards = await fetchCards(identifiers);
            setCards(current => [...current, ...cards['data']]);
            setLoading(false);
        }

        async function fetchCards(requestData) {
            return fetch('https://api.scryfall.com/cards/collection',
                {
                    method: 'POST',
                    body: JSON.stringify(requestData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => response.json())
                .catch((error) => console.error(error));
        }

        function buildCardIdentifiersJSON(names) {
            const identifiers = [];

            for (let i = 0; i < cardsPerPage; i++) {
                identifiers.push({ name: names[i + ((page - 1) * cardsPerPage)] });
            }

            return {
                identifiers: identifiers
            }
        }
    }, [page, cardsPerPage]);

    function next() {
        if (loading) {
            return;
        }

        setPage(page + 1);
    }

    return [loading, cards, next];
}

export default useScryfallCardCatalog;