const functions = require('firebase-functions');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

exports.updateCardNames = functions.pubsub.schedule('every 12 hours').onRun(async () => {
    const cardNames = await axios.get('https://api.scryfall.com/catalog/card-names')
        .then(res => res['data']['data']);

    await axios.post(process.env.HOSTNAME + '/api/cards/update-card-names', cardNames).then(() => {
        console.log('Update successful!');
    }).catch(error => console.error(error));
});