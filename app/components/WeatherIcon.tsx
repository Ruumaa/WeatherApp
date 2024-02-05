import { cn } from '@/utils/cn';
import Image from 'next/image';
import { HTMLProps } from 'react';

type Props = {};

export default function WeatherIcon(
  props: HTMLProps<HTMLDivElement> & { iconName: string }
) {
  return (
    <div
      //  {...props}
      className={cn('relative h-20 w-20 md:h-24 md:w-24')}
    >
      <Image
        width={150}
        height={150}
        className="absolute h-full w-full"
        src={`https://openweathermap.org/img/wn/${props.iconName}@4x.png`}
        alt="weather-icons"
      />
    </div>
  );
}
