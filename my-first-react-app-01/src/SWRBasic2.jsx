import useSWR from 'swr';

export default function SWRBasic() {
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&lang=ja&appid=${import.meta.env.VITE_APPID}`;
  const { data } = useSWR(endpoint );

  return (
    <figure>
    <img
      src={`https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}.png`}
      alt={data?.weather?.[0]?.main} />
    <figcaption>{data?.weather?.[0]?.description}</figcaption>
    </figure>
  );
}
