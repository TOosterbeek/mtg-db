import { app, firestore, getCollection } from "../firebase/app";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";

const { useEffect } = require("react");


export async function getSavedCardsByUID(uid) {


    if (docSnap.exists()) {
        console.log(docSnap.data());
        return docSnap.data();
    }

    console.log('No saved cards found!');
    return false;
}