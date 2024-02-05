import { CurrentWeatherProps } from '@/types/types';
import { convertKelvinToCelcius } from '@/utils/convertTemp';
import { ChevronsDown, ChevronsUp } from 'lucide-react';

export default function CurrentWeather(props: CurrentWeatherProps) {
  return (
    <>
      <div className="block md:hidden">
        <h2 className="text-3xl font-semibold md:text-6xl text-wrap md:ml-3 text-orange-600">
          {convertKelvinToCelcius(props.temp)}C&deg;
        </h2>
        <div className="text-sm md:text-lg mt-1 flex items-start gap-2">
          <div className="flex flex-col items-start mb-1">
            <span className="-mb-1">Feels</span>
            <span className="text-orange-600">like</span>
            <div></div>
          </div>
          <span className="flex h-full items-center text-xl">
            {convertKelvinToCelcius(props.feels_like)}
            &deg;
          </span>
        </div>
        <div className="flex items-center text-center text-xs md:text-lg md:gap-2 text-wrap">
          <p className="flex items-center">
            {convertKelvinToCelcius(props.temp_min)}
            &deg;
            <ChevronsDown size={15} className="text-orange-600" />
          </p>
          <p className="flex items-center">
            {convertKelvinToCelcius(props.temp_max)}
            &deg;
            <ChevronsUp size={15} className="text-orange-600" />
          </p>
        </div>
      </div>
      {/* for desktop */}
      <div className="hidden md:block">
        <h2 className="text-6xl pl-6 text-orange-600">
          {convertKelvinToCelcius(props.temp)}C&deg;
        </h2>
        <p>
          Feels <span className="text-orange-600">like</span>{' '}
          {convertKelvinToCelcius(props.feels_like)}
          &deg;
        </p>
        <div className="flex items-center text-center gap-2 justify-center">
          <p className="flex items-center">
            {convertKelvinToCelcius(props.temp_min)}
            &deg;
            <ChevronsUp size={15} className="text-orange-600" />
          </p>
          <p className="flex items-center">
            {convertKelvinToCelcius(props.temp_max)}
            &deg;
            <ChevronsUp size={15} className="text-orange-600" />
          </p>
        </div>
      </div>
    </>
  );
}
