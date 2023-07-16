import { useState } from "react";

function useScryfallCardCollection(identifiers) {
    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState([]);

    const [page, setPage] = useState(1);


}

export default useScryfallCardCollection;