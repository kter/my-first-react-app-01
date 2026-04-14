import { useEffect, useState } from 'react';
import fetcher from './fetcher';

export default function SWRPre() {
  const [data, setData] = useState(null);
  const [isRefresh, setIsRefresh] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&lang=ja&appid=${import.meta.env.VITE_APPID}`;

  useEffect(() => {
    if (!isRefresh) { return; }
    setLoading(true);
    setError('');
    fetcher(endpoint)
      .then(result => {
        setData(result);
        setIsRefresh(false);
      })
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
  }, [isRefresh]);

  if (isLoading) { return <p>Loading...</p>; }

  if (error) { return <p>Error: {error}</p>;}

  return (
    <figure>
    <img
    src={`https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}.png`}
    alt={data?.weather?.[0]?.main} />
    <figcaption>{data?.weather?.[0]?.description}</figcaption>
    </figure>
  );
}
