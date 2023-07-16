import { arrayRemove, doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { app } from "@/firebase/app";

const firestore = getFirestore(app);

async function unSaveCard(req, res) {
    if (req.method === 'GET') await handleGET(req, res);
    if (req.method === 'POST') await handlePOST(req, res);

    res.status(400).end();
}

async function handlePOST(req, res) {
    const { uid } = req.query;
    const { card } = req.body;

    const docRef = doc(firestore, 'savedCards', uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        res.status(404).end();
    } else {
        const updated = await updateDoc(docRef, {
            cardIds: arrayRemove(card)
        });

        res.status(200).end();
    }
}

export default unSaveCard;