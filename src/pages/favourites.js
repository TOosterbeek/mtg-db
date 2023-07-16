import { auth } from "@/firebase/app";
import useResource from "@/hooks/useResource";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Favourites() {
    const [user, loading] = useAuthState(auth);
    const [savedCards] = useResource(user && `/api/cards/${user.uid}/save`, [user]);

}