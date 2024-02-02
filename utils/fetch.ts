import { WeatherData } from '@/types/types';
import { useAtom } from 'jotai';
import { placeAtom } from './jotai';
// token 8cc3a8da015837476868304ebfe51903
const tokenId = process.env.NEXT_PUBLIC_WEATHER_KEY;

export const GetDataWeather = async () => {
  try {
    const [place, setPlace] = useAtom(placeAtom);
    const data: Response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${tokenId}&cnt=56`,
      { cache: 'no-store' }
    );
    const dataResult: WeatherData = await data.json();
    console.log(dataResult);
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
    console.log(dataResult);
    return dataResult;
  } catch (error) {
    console.error('Error when getInputWeather', error);
  }
};
