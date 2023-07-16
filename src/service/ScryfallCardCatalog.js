const { useEffect, useRef } = require("react");

import { useState } from "react";


// TODO: Refactor to use with service to fetch from the api
function useScryfallCardCatalog(cardsPerPage) {
    const [loading, setLoading] = useState(false);
    const [cards, setCards] = useState([]);

    const [page, setPage] = useState(1);

    const names = useRef({});

    useEffect(() => {
        buildCards();

        async function buildCards() {
            setLoading(true);

            await fetchNames();

            const identifiers = buildCardIdentifiersJSON();
            const cards = await fetchCards(identifiers);
            setCards(current => [...current, ...cards['data']]);
            setLoading(false);
        }

        async function fetchNames() {
            if (names.current.length) {
                return;
            }

            return fetch('https://api.scryfall.com/catalog/card-names')
                .then((response) => response.json())
                .then((json) => names.current = json['data'])
                .catch((error) => console.error(error));
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

        function buildCardIdentifiersJSON() {
            const identifiers = [];

            for (let i = 0; i < cardsPerPage; i++) {
                identifiers.push({ name: names.current[i + ((page - 1) * cardsPerPage)] });
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