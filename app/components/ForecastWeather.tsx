import { ForecastWeatherDetailProps } from '@/types/types';
import WeatherIcon from './WeatherIcon';
import TodayWeather from './CurrentWeather';
import CurrentWeather from './CurrentWeather';
import { ChevronsDown, ChevronsUp } from 'lucide-react';
import { convertKelvinToCelcius } from '@/utils/convertTemp';
import WeatherDetails from './WeatherDetails';
import { URL } from 'url';
import { url } from 'inspector';

type Props = {};

export default function ForecastWeather(props: ForecastWeatherDetailProps) {
  const {
    weatherIcon = '02d',
    date = '19:00',
    day = 'Tuesday',
    temp = 300,
    feels_like = 300,
    temp_min = 300,
    temp_max = 300,
    description = 'Broken Clouds',
  } = props;
  return (
    <section className="w-full h-52 flex items-center rounded-lg font-semibold mb-10">
      <div className="h-full bg-primary rounded-lg hover:border-2 hover:border-orange-600  transition ease-out duration-500  shadow-lg flex items-center w-full p-3">
        <div className="w-28 flex flex-col items-center gap-2 whitespace-nowrap font-light">
          <WeatherIcon iconName={weatherIcon} />
          <p>{date}</p>
          <p>{day}</p>
        </div>
        {/* Current Weather */}
        <div className="flex flex-col justify-around w-28 h-full text-xs font-light text-center p-2">
          <h2 className="text-6xl font-normal ml-3 mt-3 -mb-1 text-orange-600">
            {convertKelvinToCelcius(temp)}&deg;
          </h2>
          <div className="">
            <p>
              Feels like {convertKelvinToCelcius(feels_like)}
              &deg;
            </p>
            <div className="flex items-center text-center justify-center gap-2">
              <p className="flex items-center">
                {convertKelvinToCelcius(temp_min)}
                &deg; <ChevronsDown size={10} />
              </p>
              <p className="flex items-center">
                {convertKelvinToCelcius(temp_max)}
                &deg; <ChevronsUp size={10} />
              </p>
            </div>
          </div>
          <div className="font-normal text-2xl text-center capitalize ">
            {description}
          </div>
        </div>
        {/* WeatherDetails */}
        <div className="overflow-y-hidden overflow-x-auto w-full h-full flex items-center justify-around px-3 py-5 whitespace-nowrap">
          <WeatherDetails {...props} />
        </div>
      </div>
    </section>
  );
}
