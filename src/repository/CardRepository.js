import axios from "axios";
import path from 'path';

import { createReadStream, existsSync } from "fs";
import * as readline from "readline";

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
    const filePath = path.join(process.cwd(), 'card-names.json');
    if (!existsSync(filePath)) {
        await fetchAllCardNames();
    }

    const fileStream = createReadStream(filePath, 'card-names.json');
    const reader = readline.createInterface(
        {
            input: fileStream,
            crlfDelay: Infinity
        }
    );

    const lines = [];
    let lineCount = 0;
    for await (const line of reader) {
        if (lineCount < start) {
            lineCount++;
            continue;
        }

        lines.append(line);
        lineCount++;


        if (lineCount >= end) {
            return lines;
        }
    }
}