import { existsSync, readFileSync } from 'fs';
import { fetchAllCardNames } from '@/repository/CardRepository';
import * as path from 'path';

const getAlphabeticCardsInRange = async (req, res) => {
    const { start, end } = req.query;

    const filePath = path.join(process.cwd(), 'card-names.json');
    if (!existsSync(filePath)) {
        await fetchAllCardNames();
    }

    const cardNamesJSON = JSON.parse(readFileSync(filePath));
    res.status(200).json(cardNamesJSON.slice(start, end));
    return;
}

export default getAlphabeticCardsInRange;