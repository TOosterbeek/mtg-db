import axios from "axios";

export async function getSavedCards(user) {
    const savedCards =
        await axios.get(`/api/cards/${user.uid}/save`)
            .then((res) => res['data']['cardIds']);

    if (savedCards.length === 0) {
        return Promise.resolve([]);
    }

    const identifiers = {
        identifiers: savedCards.map((cardId) => { return { id: cardId } })
    }

    return axios.post('https://api.scryfall.com/cards/collection', identifiers)
        .then((res) => res['data']['data']);
}

export async function fetchAllCardNames() {
    const cardNames = await axios.get('https://api.scryfall.com/catalog/card-names')
        .then(res => res['data'['data']]);

    return axios.put('/api/cards/update-card-names', cardNames);
}

export async function getCardNamesInRange(start, end) {
    return axios.get('/api/cards/get-alphabetically', {
        params: {
            start: start,
            end: end
        }
    });
}