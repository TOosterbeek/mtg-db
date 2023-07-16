import { addDoc, arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "@/firebase/app";

async function savedCards(req, res) {
    if (req.method === 'GET') await handleGET(req, res);
    if (req.method === 'POST') await handlePOST(req, res);

    res.status(400).end();
}

async function handleGET(req, res) {
    const { uid } = req.query;

    const docRef = doc(firestore, 'savedCards', uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        res.status(404).end();
    } else {
        res.status(200).json(docSnap.data());
    }
}
async function handlePOST(req, res) {
    const { uid } = req.query;
    const { card } = req.body;

    const docRef = doc(firestore, 'savedCards', uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        //Create
        const created = await setDoc(docRef, {
            cardIds: [card]
        });
        res.status(200).end();
    } else {
        const updated = await updateDoc(docRef, {
            cardIds: arrayUnion(card)
        });

        res.status(200).end();
    }
}

export default savedCards;