'use client';
import { WeatherResponse } from '@/types/types';
import React from 'react';
import GetWeather from '@/utils/fetchClient';

type Props = {};

export default function Page({}: Props) {
  const response: WeatherResponse = GetWeather();
  console.log(response);
  if (response.isLoading) {
    return (
      <div className="flex">
        <span className="loading loading-dots loading-lg mx-auto itemsa-center h-screen text-orange-700"></span>
      </div>
    );
  }
  const data = response.data;
  const uniqueCode = [
    ...new Set(
      data?.list.map(
        // Pick only the date with split
        (entry) => new Date(entry.dt * 1000).toISOString().split('T')[0]
      )
    ),
  ];

  const firstDataForEachDate = uniqueCode.map((date) => {
    return data?.list.find((entry: any) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split('T')[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });
  console.log(firstDataForEachDate);

  return <div>page</div>;
}
