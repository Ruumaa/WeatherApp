import { WeatherData } from '@/types/types';
const tokenId = process.env.NEXT_PUBLIC_WEATHER_KEY;

export const getDataWeather = async () => {
  try {
    const data: Response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=${tokenId}&cnt=56`
    );
    const dataResult: WeatherData = await data.json();
    return dataResult;
  } catch (error) {
    console.error('Error when getDataWeather', error);
  }
};

export const getInputWeather = async (value: string) => {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${tokenId}`
    );
    const dataResult: WeatherData = await data.json();
    return dataResult;
  } catch (error) {
    console.error('Error when getInputWeather', error);
  }
};

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}
