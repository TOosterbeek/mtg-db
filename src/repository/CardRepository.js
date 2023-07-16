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