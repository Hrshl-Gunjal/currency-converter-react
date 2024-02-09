import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		fetch(
			`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`
		)
			.then((res) => {
				if (!res.ok) {
					throw new Error("Network response was not ok");
				}
				return res.json();
			})
			.then((fetchedData) => {
				setData(fetchedData[currency]);
				setLoading(false);
			})
			.catch((error) => {
				setError(error);
				setLoading(false);
			});
	}, [currency]);

	if (loading) {
		return { loading: true };
	}

	if (error) {
		return { error };
	}

	return data;
}

export default useCurrencyInfo;
