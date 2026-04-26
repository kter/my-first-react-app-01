export type WeatherType = {
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
};

export default async function fetcher(url: string): Promise<WeatherType> { ... }
function sleep(delay: number) { ... }

