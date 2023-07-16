/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";

function useResource(resourceUrl, dependencies) {
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [data, setData] = useState();

    useEffect(() => {
        loadResource();

        async function loadResource() {
            setError(undefined);
            setLoading(true);

            await axios.get(resourceUrl).then((json) => {
                setData(json['data']);
            }).catch((error) => {
                setError(error);
            });

            setLoading(false);
        }
    }, [...dependencies]);

    return [data, loading, error]
}

export default useResource;