'use client';

import useSWR, { SWRResponse } from 'swr';
import { fetcher } from './fetch';
import { WeatherResponse } from '@/types/types';

export const tokenId = process.env.NEXT_PUBLIC_WEATHER_KEY;

export default function GetWeather(place: string) {
  const { data, error, isLoading }: SWRResponse<WeatherResponse | any> = useSWR(
    `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${tokenId}&cnt=56`,
    fetcher
  );
  return {
    data,
    isLoading,
    isError: error,
  };
}
