import useSWR from 'swr';
import fetcher from './fetcher';

export default function SWRBasic() {
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&lang=ja&appid=${import.meta.env.VITE_APPID}`;
  const { data, isLoading, error } = useSWR(endpoint, fetcher);

  if (isLoading) { return <p>Loading...</p>; }
  if (error) { return <p>Error: {error.message}</p>; }

  return (
    <figure>
    <img
      src={`https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}.png`}
      alt={data?.weather?.[0]?.main} />
    <figcaption>{data?.weather?.[0]?.description}</figcaption>
    </figure>
  );
}
