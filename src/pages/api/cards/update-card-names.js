import * as fs from 'fs';
import * as path from 'path';

function updateCardNames(req, res) {
    if (req.method !== 'POST') {
        res.status(405);
    }

    fs.writeFileSync(path.join(process.cwd(), 'card-names.json'), JSON.stringify(req.body), (err) => {
        console.error(err);
        res.body = err;
        res.status(400).end();
    });

    res.status(200).end();
}

export default updateCardNames;