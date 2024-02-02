import { CurrentWeatherProps } from '@/types/types';
import { convertKelvinToCelcius } from '@/utils/convertTemp';
import { ChevronsDown, ChevronsUp } from 'lucide-react';

export default function CurrentWeather(props: CurrentWeatherProps) {
  return (
    <>
      <h2 className="text-6xl pl-6">
        {convertKelvinToCelcius(props.temp)}&deg;
      </h2>
      <p>
        Feels like {convertKelvinToCelcius(props.feels_like)}
        &deg;
      </p>
      <div className="flex items-center text-center gap-2 -ml-3">
        <p className="flex items-center">
          <ChevronsDown size={15} /> {convertKelvinToCelcius(props.temp_min)}
          &deg;
        </p>
        <p className="flex items-center">
          <ChevronsUp size={15} /> {convertKelvinToCelcius(props.temp_max)}
          &deg;
        </p>
      </div>
    </>
  );
}
