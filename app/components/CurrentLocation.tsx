'use client';
import { placeAtom } from '@/utils/atom';
import { tokenId } from '@/utils/fetchClient';
import { useAtom } from 'jotai';
import { MapPin, MapPinned } from 'lucide-react';
import React, { HTMLAttributes } from 'react';

type Props = { location?: string; className?: HTMLAttributes<string> };

export default function CurrentLocation({ location, className }: Props) {
  const [_, setPlace] = useAtom(placeAtom);
  const handleCurrentLocation = () => {
    const nav = navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${tokenId}`
        );
        const data = await response.json();
        setPlace(data.name);
      } catch (error) {
        console.error('Error when getting location', error);
      }
    });
  };
  return (
    <div
      title="Your current location"
      onClick={handleCurrentLocation}
      className={`${className} flex items-center gap-1`}
    >
      <h3 className="block md:hidden font-semibold font-sans text-lg capitalize">
        {location}
      </h3>
      <MapPinned
        size={20}
        className="cursor-pointer text-orange-600 hover:text-orange-700 transition ease-in-out duration-300 hover:animate-bounce"
      />
      <h3 className="hidden md:block font-semibold font-sans text-lg capitalize">
        {location}
      </h3>
    </div>
  );
}
